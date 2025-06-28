import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../styles/dashboard.css"; // Import the corresponding CSS file
import axios from "axios";

const Dashboard = () => {
  const [current, setCurrent] = useState("5");
  const [limit, setLimit] = useState("0");
  const [showModal, setShowModal] = useState(false);
  const [newLimit, setNewLimit] = useState("");

  useEffect(() => {
    // Simulating API call - replace with actual axios call

    const getCurrentPatient = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/getpatient");
        setCurrent(res.data.currentToken);
        setLimit(res.data.limit);
        console.log(res);
      } catch (error) {
        console.log("Error fetching the data on load");
      }
    };
    getCurrentPatient();
  }, []);

  const nextPatient = async () => {
    try {
      // Simulated API call
      const res = await axios.post("http://localhost:3001/api/increasepatient");
      // const newCurrent = String(parseInt(current) + 1);
      setCurrent(res.data.currentToken);
    } catch (error) {
      console.log("err in the inc patient", error);
    }
  };

  const handleSetLimit = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewLimit("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleLimitSubmit = async () => {
    if (newLimit.trim() && !isNaN(newLimit) && parseInt(newLimit) > 0) {
      try {
        // Simulated API call to set the limit
        const res = await axios.post("http://localhost:3001/api/setlimit", {
          limit: newLimit,
        });
        setLimit(res.data.limit);
        handleModalClose();
      } catch (error) {
        console.log("Error setting limit", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLimitSubmit();
    } else if (e.key === "Escape") {
      handleModalClose();
    }
  };

  // Calculate percentages
  const limitNum = parseInt(limit) || 0;
  const currentNum = parseInt(current) || 0;
  const remaining = limitNum - currentNum;
  const remainingPercentage =
    limitNum > 0 ? Math.round((remaining / limitNum) * 100) : 0;
  const currentPercentage =
    limitNum > 0 ? Math.round((currentNum / limitNum) * 100) : 0;

  // Data for bar chart
  const chartData = [
    {
      name: "OPD Limit",
      value: 100,
      actual: limitNum,
      color: "#10b981",
    },
    {
      name: "Remaining",
      value: remainingPercentage,
      actual: remaining,
      color: "#f59e0b",
    },
    {
      name: "Current Token",
      value: currentPercentage,
      actual: currentNum,
      color: "#ef4444",
    },
  ];

  // Data for pie chart
  const pieData = [
    {
      name: "Served",
      value: currentNum,
      color: "#ef4444",
    },
    {
      name: "Remaining",
      value: remaining > 0 ? remaining : 0,
      color: "#f59e0b",
    },
  ];

  const COLORS = ["#ef4444", "#f59e0b"];

  const projects = [
    {
      id: 1,
      icon: "🚀",
      name: "AI KYC",
      hours: 120,
      priority: "High",
      members: ["👤", "👩‍💻"],
      progress: 76,
      color: "green",
    },
    {
      id: 2,
      icon: "📱",
      name: "Mero Room",
      hours: 95,
      priority: "Medium",
      members: ["👨‍💻", "👤"],
      progress: 48,
      color: "orange",
    },
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  const renderMembers = (members) => (
    <div className="members-display">
      {members.map((m, i) => (
        <span key={i} className="member-emoji">
          {m}
        </span>
      ))}
    </div>
  );

  const renderProgressBar = (progress, color) => (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`,
          backgroundColor:
            color === "green"
              ? "#10b981"
              : color === "orange"
              ? "#f59e0b"
              : "#3b82f6",
        }}
      ></div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">Percentage: {payload[0].value}%</p>
          <p className="tooltip-actual">Actual: {payload[0].payload.actual}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="menu-icon">☰</div>
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
            <span className="search-icon">🔍</span>
          </div>
        </div>
        <div className="header-right">
          <span className="notification-icon">🔔</span>
          <div className="user-avatar">👤</div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-title">
          <h1>Namaste, Bir Hospital</h1>
          <div className="button-group">
            <button onClick={handleSetLimit} className="set-limit-btn">
              Set OPD Limit
            </button>
            <button onClick={nextPatient} className="create-project-btn">
              Next Patient
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span>OPD Limit for Today</span>
              <div className="stat-icon projects-icon">📁</div>
            </div>
            <div className="stat-number">{limit}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Remaining Tokens To Serve</span>
              <div className="stat-icon tasks-icon">📋</div>
            </div>
            <div className="stat-number">{remaining}</div>
            <div className="stat-subtitle">
              {remainingPercentage}% remaining
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Current Serving Patient</span>
              <div className="stat-icon teams-icon">👥</div>
            </div>
            <div className="stat-number">{current}</div>
            <div className="stat-subtitle">{currentPercentage}% served</div>
          </div>
        </div>

        <div className="content-grid">
          {/* <div className="projects-section">
            <h2>Active Projects</h2>
            <div className="projects-table">
              <div className="table-header">
                <div className="header-cell">Project name</div>
                <div className="header-cell">Hours</div>
                <div className="header-cell">Priority</div>
                <div className="header-cell">Members</div>
                <div className="header-cell">Progress</div>
              </div>

              {projects.map((project) => (
                <div key={project.id} className="table-row">
                  <div className="project-name-cell">
                    <span className="project-icon">{project.icon}</span>
                    <span className="project-name">{project.name}</span>
                  </div>
                  <div className="hours-cell">{project.hours}</div>
                  <div className="priority-cell">
                    <span
                      className={`priority-badge ${getPriorityClass(
                        project.priority
                      )}`}
                    >
                      {project.priority}
                    </span>
                  </div>
                  <div className="members-cell">
                    {renderMembers(project.members)}
                  </div>
                  <div className="progress-cell">
                    <span className="progress-text">{project.progress}%</span>
                    {renderProgressBar(project.progress, project.color)}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div className="performance-section">
            <div className="performance-header">
              <h2>OPD Analysis</h2>
              <div className="menu-dots">⋯</div>
            </div>

            <div className="chart-container">
              <div className="chart-section">
                <h3>Progress Overview</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: "#e0e0e0" }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: "#e0e0e0" }}
                      label={{ value: "%", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="pie-section">
                <h3>Distribution</h3>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="performance-stats">
              <div className="perf-stat">
                <div className="perf-icon completed">✓</div>
                <div className="perf-number">100%</div>
                <div className="perf-label">OPD Limit</div>
              </div>
              <div className="perf-stat">
                <div className="perf-icon in-progress">↗</div>
                <div className="perf-number">{remainingPercentage}%</div>
                <div className="perf-label">Remaining</div>
              </div>
              <div className="perf-stat">
                <div className="perf-icon behind">📊</div>
                <div className="perf-number">{currentPercentage}%</div>
                <div className="perf-label">Served</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Set Limit for Today</h3>
              <button className="modal-close" onClick={handleModalClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <input
                type="number"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter OPD limit"
                className="modal-input"
                autoFocus
                min="1"
              />
            </div>
            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={handleModalClose}>
                Cancel
              </button>
              <button
                className="modal-ok-btn"
                onClick={handleLimitSubmit}
                disabled={
                  !newLimit.trim() || isNaN(newLimit) || parseInt(newLimit) <= 0
                }
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
