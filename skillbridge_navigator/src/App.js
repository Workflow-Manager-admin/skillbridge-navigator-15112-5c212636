import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function SkillBridgeNavigator() {
  // Sample data for skills and job roles - in a real app, these would likely come from an API or be more dynamic
  const availableSkills = [
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'CSS' },
    { name: 'Node.js' },
    { name: 'Python' },
    { name: 'SQL' },
    { name: 'Communication' },
    { name: 'Teamwork' },
  ];

  const jobRoles = [
    {
      name: 'Frontend Developer',
      requiredSkills: {
        'JavaScript': 4,
        'React': 4,
        'CSS': 4,
        'Node.js': 2,
      }
    },
    {
      name: 'Backend Developer',
      requiredSkills: {
        'Python': 4,
        'Node.js': 4,
        'SQL': 4,
        'Communication': 2
      }
    },
    {
      name: 'Full Stack Engineer',
      requiredSkills: {
        'JavaScript': 3,
        'React': 3,
        'CSS': 3,
        'Node.js': 3,
        'Python': 3,
        'SQL': 3,
        'Communication': 3,
        'Teamwork': 3
      }
    },
    {
      name: 'Project Manager',
      requiredSkills: {
        'Communication': 5,
        'Teamwork': 5,
        'SQL': 2,
        'JavaScript': 1
      }
    }
  ];

  const learningResources = {
    'JavaScript': [
      { title: "JavaScript.info Tutorial", link: "https://javascript.info/" },
      { title: "MDN JS Guide", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
    ],
    'React': [
      { title: "React Official Docs", link: "https://reactjs.org/docs/getting-started.html" },
      { title: "FreeCodeCamp React Course", link: "https://www.freecodecamp.org/news/learn-react-js-in-5-minutes/" },
    ],
    'CSS': [
      { title: "CSS Tricks", link: "https://css-tricks.com/" },
      { title: "MDN CSS Reference", link: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference" },
    ],
    'Node.js': [
      { title: "Node.js Docs", link: "https://nodejs.org/en/docs/" },
    ],
    'Python': [
      { title: "Python.org Docs", link: "https://docs.python.org/3/tutorial/" },
      { title: "Real Python", link: "https://realpython.com/" },
    ],
    'SQL': [
      { title: "SQLBolt", link: "https://sqlbolt.com/" },
      { title: "Khan Academy SQL", link: "https://www.khanacademy.org/computing/computer-programming/sql" },
    ],
    'Communication': [
      { title: "MindTools Communication", link: "https://www.mindtools.com/CommSkll/CommunicationIntro.htm" },
    ],
    'Teamwork': [
      { title: "SkillsYouNeed Teamwork", link: "https://www.skillsyouneed.com/ips/team-working.html" },
    ],
  };

  // Step Management
  const [step, setStep] = useState(1);

  // Skill Assessment State: userSkills is { skillName: proficiency (1-5, 0 if not set) }
  const [userSkills, setUserSkills] = useState({});
  // Job Role Selection
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);

  // Progress
  const [acquired, setAcquired] = useState({}); // Tracks what skills were marked as improved

  // PUBLIC_INTERFACE
  function handleSkillChange(skill, proficiency) {
    setUserSkills({ ...userSkills, [skill]: Number(proficiency) });
  }

  // PUBLIC_INTERFACE
  function handleStepContinue() {
    if (step === 1 && availableSkills.every(s => userSkills[s.name])) {
      setStep(2);
    } else if (step === 2 && selectedRoleIndex !== null) {
      setStep(3);
    }
  }
  // PUBLIC_INTERFACE
  function handleStepBack() {
    setStep(Math.max(1, step - 1));
  }
  // PUBLIC_INTERFACE
  function handleSkillAcquired(skill) {
    setAcquired({ ...acquired, [skill]: true });
  }

  // Calculate gap analysis
  let gapSkillData = [];
  if (step === 3 && selectedRoleIndex !== null) {
    const required = jobRoles[selectedRoleIndex].requiredSkills;
    gapSkillData = Object.entries(required).map(([skill, needed]) => {
      const current = userSkills[skill] || 0;
      const gap = Math.max(needed - current, 0);
      // If acquired through progress, treat as filled
      const filled = acquired[skill] ? needed : current;
      return {
        skill,
        needed,
        current: filled,
        gap: Math.max(needed - filled, 0),
        acquired: !!acquired[skill]
      };
    });
  }

  // Color helpers
  const COLORS = {
    primary: "#4F8A8B",
    secondary: "#FBD46D",
    accent: "#F6416C",
    text: "#1A1A1A",
    card: "#ffffff",
    cardShadow: "rgba(79, 138, 139, 0.07)",
    progressBg: "#efefef"
  };

  // Inline style helpers for accent
  function cardStyle(accent) {
    return {
      background: COLORS.card,
      borderRadius: 14,
      boxShadow: `0 2px 12px 0 ${COLORS.cardShadow}`,
      padding: accent ? '30px 28px 22px 28px' : '20px 18px',
      marginBottom: 24,
      borderLeft: accent ? `6px solid ${COLORS.accent}` : `2px solid ${COLORS.primary}`,
      color: COLORS.text
    };
  }

  // Main render
  return (
    <div style={{ background: "#f8f8fb", minHeight: "100vh" }}>
      <header style={{
        width: "100%",
        background: COLORS.primary,
        color: "#fff",
        padding: "0 0 8px 0",
        boxShadow: "0px 2px 16px 0 rgba(79, 138, 139, 0.07)"
      }}>
        <div className="container" style={{
          paddingTop: 24, paddingBottom: 16,
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
        }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
            <span role="img" aria-label="road" style={{ color: COLORS.secondary, marginRight: 6 }}>🛤️</span>
            SkillBridge Navigator
          </div>
          <div style={{
            color: COLORS.secondary, fontSize: 18, fontWeight: 500, marginBottom: 10
          }}>
            Map your path from your <span style={{ color: "#fff", background: COLORS.accent, padding: "1px 9px", borderRadius: 6 }}>current skills</span> to your <span style={{ color: "#fff", background: COLORS.primary, padding: "1px 9px", borderRadius: 6 }}>dream role</span>!
          </div>
          <div style={{
            color: "rgba(255,255,255,0.88)",
            maxWidth: 650,
            fontSize: 15,
            lineHeight: 1.58
          }}>
            Interactive skill gap analyzer & learning companion — assess your skills, pick a job role, receive a gap report and tailored learning resources, and track your progress.
          </div>
        </div>
      </header>
      <main style={{ paddingTop: 32, paddingBottom: 44, minHeight: "calc(100vh - 100px)" }}>
        <div className="container" style={{
          marginTop: 24, maxWidth: 920
        }}>
        {/* Stepper Navigation */}
        <ProgressStepper step={step} COLORS={COLORS} />
        {/* Step 1: Skill Assessment */}
        {step === 1 && (
          <div style={cardStyle(true)}>
            <h2 style={{ marginTop: 0, color: COLORS.primary }}>Step 1: Assess Your Skills</h2>
            <div style={{ marginBottom: 16 }}>Please rate your proficiency in each skill (1 = Beginner, 5 = Expert):</div>
            <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, maxWidth: 600 }}>
              {availableSkills.map(skillObj =>
                <SkillSlider
                  key={skillObj.name}
                  label={skillObj.name}
                  value={userSkills[skillObj.name] || 1}
                  onChange={value => handleSkillChange(skillObj.name, value)}
                  accent={COLORS.secondary}
                />
              )}
            </form>
            <div style={{ textAlign: "right", marginTop: 22 }}>
              <button
                className="btn btn-large"
                disabled={availableSkills.some(s => !userSkills[s.name])}
                style={{
                  background: COLORS.primary,
                  borderColor: COLORS.primary
                }}
                onClick={handleStepContinue}
              >
                Next: Select Job Role&nbsp;→
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Job Role Selection */}
        {step === 2 && (
          <div style={cardStyle(true)}>
            <h2 style={{ marginTop: 0, color: COLORS.primary }}>Step 2: Select Job Role</h2>
            <div style={{ marginBottom: 14 }}>Choose a job/career path to match your skill set against:</div>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 22,
              justifyContent: "flex-start"
            }}>
              {jobRoles.map((role, idx) => (
                <div
                  key={role.name}
                  onClick={() => setSelectedRoleIndex(idx)}
                  style={{
                    cursor: "pointer",
                    minWidth: 180,
                    background: selectedRoleIndex === idx ? COLORS.primary : COLORS.card,
                    color: selectedRoleIndex === idx ? "#fff" : COLORS.text,
                    border: `2.5px solid ${selectedRoleIndex === idx ? COLORS.accent : COLORS.primary}`,
                    borderRadius: 12,
                    boxShadow: selectedRoleIndex === idx ? `0 2px 10px 0 ${COLORS.primary}22` : `0 1px 6px 0 ${COLORS.cardShadow}`,
                    fontWeight: 500,
                    fontSize: 16,
                    padding: "20px 22px",
                    transition: "all 0.15s"
                  }}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 7 }}>{role.name}</div>
                  <div style={{ fontSize: 13, color: selectedRoleIndex === idx ? "#ffe" : "#666", marginBottom: 7 }}>
                    Skills: {Object.keys(role.requiredSkills).join(", ")}
                  </div>
                  <span style={{
                    background: COLORS.secondary,
                    color: COLORS.text,
                    fontSize: 12,
                    padding: "3px 10px",
                    borderRadius: 7,
                    fontWeight: 600
                  }}>{Object.keys(role.requiredSkills).length} skills</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              <button
                className="btn"
                style={{
                  background: "#fff", color: COLORS.primary, border: `1.7px solid ${COLORS.primary}`
                }}
                onClick={handleStepBack}
              >
                ← Back
              </button>
              <button
                className="btn btn-large"
                disabled={selectedRoleIndex === null}
                style={{
                  background: COLORS.primary,
                  borderColor: COLORS.primary,
                  opacity: selectedRoleIndex === null ? .7 : 1
                }}
                onClick={handleStepContinue}>
                Generate Gap Analysis&nbsp;→
              </button>
            </div>
          </div>
        )}
        {/* Step 3: Gap Analysis */}
        {step === 3 && selectedRoleIndex !== null && (
          <div>
            <div style={cardStyle(true)}>
              <h2 style={{ marginTop: 0, color: COLORS.primary }}>
                Gap Analysis Report: <span style={{ color: COLORS.accent }}>{jobRoles[selectedRoleIndex].name}</span>
              </h2>
              <div style={{ marginBottom: 14, color: "#444", fontSize: 15 }}>
                <b>Your Current Skill Proficiency vs. Job Requirements</b>
              </div>
              <div>
                {gapSkillData.map(({ skill, needed, current, gap, acquired }) => (
                  <SkillGapCard
                    key={skill}
                    skill={skill}
                    needed={needed}
                    current={current}
                    gap={gap}
                    acquired={acquired}
                    COLORS={COLORS}
                    onAcquire={() => handleSkillAcquired(skill)}
                    resources={learningResources[skill]}
                  />
                ))}
              </div>
            </div>
            <div style={cardStyle()}>
              <h3 style={{ color: COLORS.primary, marginTop: 0 }}>Learning Resource Suggestions</h3>
              <ResourceList gapSkillData={gapSkillData} learningResources={learningResources} accent={COLORS.accent} primary={COLORS.primary} />
            </div>
            <div style={{ ...cardStyle(), marginBottom: 44, background: COLORS.progressBg }}>
              <h4 style={{
                color: COLORS.primary,
                margin: "0 0 12px 0"
              }}>Your Progress</h4>
              <ProgressTracker acquired={acquired} gapSkillData={gapSkillData} accent={COLORS.accent} />
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                className="btn"
                style={{ background: "#fff", color: COLORS.primary, border: `2px solid ${COLORS.primary}` }}
                onClick={handleStepBack}
              >
                ← Back
              </button>
              <button
                className="btn btn-large"
                onClick={() => {
                  // Reset state for new session
                  setStep(1);
                  setUserSkills({});
                  setSelectedRoleIndex(null);
                  setAcquired({});
                }}
                style={{ background: COLORS.accent, color: "#fff", marginLeft: 12 }}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
        </div>
      </main>
      <footer style={{
        width: "100%",
        background: "#fff",
        color: COLORS.text,
        fontWeight: 400,
        fontSize: 15,
        textAlign: 'center',
        letterSpacing: 0.3,
        boxShadow: "0 -2px 8px 0 #4f8a8b05",
        padding: "18px 0 10px 0"
      }}>
        <div>
          SkillBridge Navigator &copy; {new Date().getFullYear()} | <span style={{ color: COLORS.accent }}>Level up your career 🚀</span>
        </div>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function ProgressStepper({ step, COLORS }) {
  const steps = [
    { label: "Assess Skills" },
    { label: "Select Role" },
    { label: "Gap Analysis & Progress" }
  ];
  return (
    <nav style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      margin: "22px 0", gap: 0
    }}>
      {steps.map((s, idx) => {
        const active = step > idx;
        return (
          <React.Fragment key={s.label}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              flex: 1, minWidth: 108
            }}>
              <div style={{
                background: active ? COLORS.primary : COLORS.progressBg,
                color: active ? "#fff" : COLORS.primary,
                borderRadius: 24,
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 18, border: `3px solid ${COLORS.primary}`,
                marginBottom: 4, transition: "all .14s"
              }}>
                {idx + 1}
              </div>
              <div style={{
                color: active ? COLORS.primary : "#888", fontSize: 15, fontWeight: 600,
                letterSpacing: 0.2,
                textShadow: active ? "0 1px 0 #fff6" : "none"
              }}>{s.label}</div>
            </div>
            {idx < steps.length - 1 && (
              <div style={{
                flex: "none", width: 38, height: 2.9,
                background: active && step > idx + 1 ? COLORS.primary : COLORS.progressBg,
                margin: "0 2px", borderRadius: 3, transition: "background .13s"
              }}></div>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

// PUBLIC_INTERFACE
function SkillSlider({ label, value, onChange, accent }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 4,
      minHeight: 58, padding: "0 2px"
    }}>
      <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
      <input
        type="range"
        min={1}
        max={5}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          accentColor: accent,
          marginTop: 6
        }}
      />
      <div style={{
        display: "flex", justifyContent: "space-between", fontSize: 13,
        color: "#666",
      }}>
        <span>Beginner</span>
        <span style={{ fontWeight: 600 }}>{value}</span>
        <span>Expert</span>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function SkillGapCard({ skill, needed, current, gap, acquired, COLORS, onAcquire, resources }) {
  return (
    <div style={{
      marginBottom: 20,
      background: acquired ? "#e6ffe5" : "#fff5f5",
      border: `2.8px solid ${acquired ? COLORS.primary : COLORS.accent}`,
      borderRadius: 13,
      boxShadow: `0 1px 9px 0 ${COLORS.cardShadow}`,
      padding: "18px 17px 16px 20px",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <span style={{
          background: acquired ? COLORS.primary : COLORS.accent,
          color: "#fff",
          borderRadius: "7px",
          fontWeight: 700,
          fontSize: 13,
          padding: "2px 11px",
          marginRight: 10
        }}>
          {skill}
        </span>
        <span style={{
          fontWeight: 550, fontSize: 15, color: "#111", flex: 1
        }}>
          Required: {needed} / Yours: {current} {' '}
          {acquired &&
            <span style={{ color: COLORS.primary, fontWeight: 600, fontSize: 13 }}>(Acquired)</span>
          }
        </span>
      </div>
      {/* Progress bar */}
      <div style={{ marginBottom: 7, height: 16, display: "flex", alignItems: "center" }}>
        <ProgressBar
          percent={Math.min((current / needed) * 100, 100)}
          accent={acquired ? COLORS.primary : COLORS.accent}
          secondary="#e3edfa"
        />
        {gap > 0 && !acquired &&
        <span style={{
          marginLeft: 16,
          fontSize: 13,
          color: COLORS.accent,
          fontWeight: 600
        }}>
          {gap} to go
        </span>
        }
      </div>
      {/* Action / resource */}
      {gap > 0 && !acquired && (
        <div style={{
          display: "flex", alignItems: "center",
          gap: 16,
        }}>
          <button
            className="btn"
            style={{
              background: COLORS.accent, color: "#fff", fontWeight: 600, fontSize: 14,
              border: 'none', padding: "7px 18px", borderRadius: 7
            }}
            onClick={onAcquire}
          >
            Mark as Acquired
          </button>
          {resources && resources.length > 0 &&
            <a
              href={resources[0].link}
              target="_blank" rel="noopener noreferrer"
              style={{
                color: COLORS.accent,
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "underline"
              }}>
              View resource: {resources[0].title}
            </a>
          }
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function ProgressBar({ percent, accent, secondary }) {
  return (
    <div style={{
      width: 170, height: 13, background: secondary, borderRadius: 9,
      overflow: "hidden", position: "relative"
    }}>
      <div style={{
        width: `${percent}%`, height: "100%", background: accent,
        borderRadius: 9, transition: "width .3s"
      }} />
    </div>
  );
}

// PUBLIC_INTERFACE
function ResourceList({ gapSkillData, learningResources, accent, primary }) {
  // Filter only skill gaps
  const gaps = gapSkillData.filter(g => g.gap > 0);
  if (gaps.length === 0) {
    return <div style={{ color: primary, fontWeight: 500 }}>You're all set! No skill gaps remaining!</div>;
  }
  return (
    <ul style={{ paddingLeft: 28, margin: 0 }}>
      {gaps.map(({ skill }) => (
        <li key={skill} style={{ marginBottom: 10 }}>
          <span style={{
            fontWeight: 500, color: accent, fontSize: 15
          }}>{skill}</span>
          <ul>
            {(learningResources[skill] || []).map(res => (
              <li key={res.link} style={{ fontSize: 14 }}>
                <a href={res.link} target="_blank" rel="noopener noreferrer" style={{
                  color: primary,
                  textDecoration: "underline"
                }}>
                  {res.title}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

// PUBLIC_INTERFACE
function ProgressTracker({ acquired, gapSkillData, accent }) {
  const total = gapSkillData.length;
  const closed = gapSkillData.filter(g => g.acquired || g.gap === 0).length;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap"
    }}>
      <ProgressBar
        percent={total === 0 ? 0 : Math.round((closed / total) * 100)}
        accent={accent}
        secondary="#ddd"
      />
      <span style={{ fontWeight: 600, color: accent, fontSize: 15 }}>
        {closed} of {total} skills acquired!
      </span>
    </div>
  );
}

export default SkillBridgeNavigator;
