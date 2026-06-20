import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, GitCommit, Flame, Code } from "lucide-react";

// Custom count up animation helper
function CountUp({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startVal = 0;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic out ease
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(startVal + easeOut * (value - startVal));

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value, duration]);

  return <span ref={ref} className="tabular-nums">{count}</span>;
}

export default function GithubDashboard() {
  const [stats, setStats] = useState({
    repos: 3,
    commits: 186,
    streak: 18,
    longestStreak: 45,
  });
  const [languages, setLanguages] = useState([
    { name: "JavaScript", pct: 100 },
  ]);
  const [contributions, setContributions] = useState(null);
  const [, setLoading] = useState(true);

  // Fetch from GitHub API on mount
  useEffect(() => {
    const fetchGithubData = async () => {
      let reposCount = 3;
      let commitsEst = 186;
      let currentStreak = 18;
      let longestStreak = 45;
      let fetchedLangs = {};

      try {
        // Fetch user info
        const userRes = await fetch("https://api.github.com/users/NITHEESHRAMASAMY");
        if (userRes.ok) {
          const userData = await userRes.json();
          reposCount = userData.public_repos || reposCount;
        }
      } catch (err) {
        console.warn("Error fetching user profile:", err);
      }

      try {
        // Fetch repositories languages estimate
        const reposRes = await fetch("https://api.github.com/users/NITHEESHRAMASAMY/repos?per_page=50");
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          reposData.forEach((repo) => {
            if (repo.language) {
              fetchedLangs[repo.language] = (fetchedLangs[repo.language] || 0) + 1;
            }
          });
        }
      } catch (err) {
        console.warn("Error fetching repo languages:", err);
      }

      try {
        // Fetch contribution calendar
        const contRes = await fetch("https://github-contributions-api.deno.dev/NITHEESHRAMASAMY.json");
        if (contRes.ok) {
          const contData = await contRes.json();
          if (contData && contData.contributions) {
            setContributions(contData.contributions);
            
            const days = contData.contributions.flat();
            days.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            let tempStreak = 0;
            let computedLongest = 0;
            for (let i = 0; i < days.length; i++) {
              if (days[i].contributionCount > 0) {
                tempStreak++;
                if (tempStreak > computedLongest) {
                  computedLongest = tempStreak;
                }
              } else {
                tempStreak = 0;
              }
            }
            
            let lastActiveIdx = -1;
            for (let i = days.length - 1; i >= 0; i--) {
              if (days[i].contributionCount > 0) {
                lastActiveIdx = i;
                break;
              }
            }
            
            let computedCurrent = 0;
            if (lastActiveIdx !== -1) {
              const lastActiveDate = new Date(days[lastActiveIdx].date);
              const today = new Date();
              const diffTime = Math.abs(today - lastActiveDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              if (diffDays <= 2) {
                for (let i = lastActiveIdx; i >= 0; i--) {
                  if (days[i].contributionCount > 0) {
                    computedCurrent++;
                  } else {
                    break;
                  }
                }
              }
            }
            
            commitsEst = contData.totalContributions || commitsEst;
            currentStreak = computedCurrent || currentStreak;
            longestStreak = computedLongest || longestStreak;
          }
        }
      } catch (err) {
        console.warn("Error fetching contributions:", err);
      }

      // Parse language percentages
      const langKeys = Object.keys(fetchedLangs);
      if (langKeys.length > 0) {
        const totalCount = langKeys.reduce((acc, k) => acc + fetchedLangs[k], 0);
        const langArr = langKeys.map((k) => ({
          name: k,
          pct: Math.round((fetchedLangs[k] / totalCount) * 100),
        })).sort((a, b) => b.pct - a.pct);
        setLanguages(langArr.slice(0, 4));
      } else {
        setLanguages([{ name: "JavaScript", pct: 100 }]);
      }

      setStats({
        repos: reposCount,
        commits: commitsEst,
        streak: currentStreak,
        longestStreak: longestStreak,
      });
      setLoading(false);
    };

    fetchGithubData();
  }, []);

  // Generate matrix fallback
  const columns = Array.from({ length: 42 });
  const rows = Array.from({ length: 7 });

  // Green color scales for contribution matrix squares
  const getContributionColorFallback = (colIdx, rowIdx) => {
    const rand = Math.sin(colIdx * 3 + rowIdx * 7) * 10;
    const value = Math.abs(Math.floor(rand)) % 5;
    
    if (value === 0) return "bg-neutral-900";        // 0 commits
    if (value === 1) return "bg-emerald-950";        // 1-3 commits
    if (value === 2) return "bg-emerald-800";        // 3-6 commits
    if (value === 3) return "bg-emerald-600";        // 6-9 commits
    return "bg-emerald-400";                         // 10+ commits
  };

  const getContributionColorForDay = (day) => {
    if (!day || day.contributionCount === 0 || day.contributionLevel === "NONE") {
      return "bg-neutral-900";
    }
    switch (day.contributionLevel) {
      case "FIRST_QUARTILE":
        return "bg-emerald-950";
      case "SECOND_QUARTILE":
        return "bg-emerald-800";
      case "THIRD_QUARTILE":
        return "bg-emerald-600";
      case "FOURTH_QUARTILE":
        return "bg-emerald-400";
      default:
        return "bg-emerald-700";
    }
  };

  return (
    <section
      id="github-dashboard"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-black flex flex-col justify-between relative"
    >
      <div className="flex flex-col gap-2 mb-16">
        <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
          [ INTEGRATIONS ]
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-white uppercase leading-none">
          GITHUB ACTIVITY
        </h2>
      </div>

      {/* Main dashboard console grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full flex-1">
        
        {/* Left Console Column: Stats and Lang Breakdown */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Card Statistics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Repos */}
            <div className="border border-neutral-900 bg-neutral-950/40 p-6 rounded-xl flex items-center gap-5 hover:border-neutral-800 transition-colors duration-300">
              <div className="p-3 bg-neutral-900 rounded-lg text-white">
                <GitBranch size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                  Total Repos
                </span>
                <span className="text-3xl font-display text-white font-semibold">
                  <CountUp value={stats.repos} />
                </span>
              </div>
            </div>

            {/* Commits */}
            <div className="border border-neutral-900 bg-neutral-950/40 p-6 rounded-xl flex items-center gap-5 hover:border-neutral-800 transition-colors duration-300">
              <div className="p-3 bg-neutral-900 rounded-lg text-white">
                <GitCommit size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                  Commit Count
                </span>
                <span className="text-3xl font-display text-white font-semibold">
                  <CountUp value={stats.commits} />
                </span>
              </div>
            </div>

            {/* Current Streak */}
            <div className="border border-neutral-900 bg-neutral-950/40 p-6 rounded-xl flex items-center gap-5 hover:border-neutral-800 transition-colors duration-300">
              <div className="p-3 bg-neutral-900 rounded-lg text-white">
                <Flame size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                  Current Streak
                </span>
                <span className="text-3xl font-display text-white font-semibold">
                  <CountUp value={stats.streak} /> days
                </span>
              </div>
            </div>

            {/* Longest Streak */}
            <div className="border border-neutral-900 bg-neutral-950/40 p-6 rounded-xl flex items-center gap-5 hover:border-neutral-800 transition-colors duration-300">
              <div className="p-3 bg-neutral-900 rounded-lg text-white">
                <Flame size={22} className="opacity-60" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                  Longest Streak
                </span>
                <span className="text-3xl font-display text-white font-semibold">
                  <CountUp value={stats.longestStreak} /> days
                </span>
              </div>
            </div>
          </div>

          {/* Languages card */}
          <div className="border border-neutral-900 bg-neutral-950/40 p-6 rounded-xl flex flex-col gap-5 hover:border-neutral-800 transition-colors duration-300 flex-1 justify-center">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
              <Code size={14} className="text-neutral-400" />
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                Language Allocation
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {languages.map((lang, index) => (
                <div key={lang.name} className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono text-[10px] text-neutral-400">
                    <span>{lang.name}</span>
                    <span>{lang.pct}%</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-900 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-white origin-left"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Console Column: Contribution Graph */}
        <div className="lg:col-span-5 border border-neutral-900 bg-neutral-950/40 p-6 rounded-xl flex flex-col justify-between hover:border-neutral-800 transition-colors duration-300 min-h-[350px]">
          
          <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              Contribution History
            </span>
            <span className="font-mono text-[9px] text-neutral-600 uppercase">
              Green Grid // 53w
            </span>
          </div>

          {/* Svg/HTML Grid Container */}
          <div className="flex-1 flex flex-col justify-center overflow-x-auto select-none py-6 scrollbar-none">
            <div className="flex gap-[3px] min-w-full">
              {(contributions || columns).map((colVal, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {(contributions ? colVal : rows).map((dayVal, rowIdx) => {
                    const colorClass = contributions
                      ? getContributionColorForDay(dayVal)
                      : getContributionColorFallback(colIdx, rowIdx);
                    
                    const titleText = contributions
                      ? `${dayVal.contributionCount} contributions on ${dayVal.date}`
                      : `Week ${colIdx}, Day ${rowIdx}`;

                    return (
                      <motion.div
                        key={rowIdx}
                        initial={{ scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{
                          duration: 0.4,
                          delay: (colIdx * 7 + rowIdx) * 0.001, // Stagger grid squares sequentially
                        }}
                        className={`w-[7px] h-[7px] md:w-[9px] md:h-[9px] rounded-sm transition-colors duration-500 hover:scale-125 ${colorClass}`}
                        title={titleText}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Labels under graph */}
            <div className="flex justify-between font-mono text-[8px] text-neutral-600 tracking-wider mt-4 px-1 uppercase">
              <span>Less</span>
              <div className="flex gap-[3px] items-center">
                <div className="w-[7px] h-[7px] bg-neutral-900 rounded-sm" />
                <div className="w-[7px] h-[7px] bg-emerald-950 rounded-sm" />
                <div className="w-[7px] h-[7px] bg-emerald-800 rounded-sm" />
                <div className="w-[7px] h-[7px] bg-emerald-600 rounded-sm" />
                <div className="w-[7px] h-[7px] bg-emerald-400 rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Metric Bottom Tagline */}
          <div className="border-t border-neutral-900 pt-4 font-mono text-[9px] text-neutral-500 leading-normal">
            <p>// Public repositories synced live via GitHub API endpoints.</p>
            <p className="text-neutral-600 mt-0.5">// Contribution values correspond to past commits, issues, and PR approvals.</p>
          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>INTEGRATIONS // GITHUB LAB</span>
        <span>026 // © NITHEESH R</span>
      </div>
    </section>
  );
}
