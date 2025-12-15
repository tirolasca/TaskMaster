import React, { useState, useEffect, useRef } from "react";
import TodoBoard from "./components/TodoBoard";
import { themes, Theme } from "./components/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBolt,
  faPalette,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const themeIcons: Record<string, any> = {
  light: faSun,
  dark: faMoon,
  neon: faBolt,
  pastel: faPalette,
};

const App: React.FC = () => {
  const [themeKey, setThemeKey] = useState<string>(() => {
    const saved = localStorage.getItem("theme");
    return saved && themes[saved as keyof typeof themes] ? saved : "light";
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentTheme: Theme = themes[themeKey as keyof typeof themes];

  useEffect(() => {
    localStorage.setItem("theme", themeKey);
  }, [themeKey]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gradientes por tema
  const gradients: Record<string, string> = {
    light: "#ffffff",
    dark: "#121212",
    neon: "linear-gradient(135deg, #00ffc3, #00ffae)",
    pastel: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
  };

  const hoverGradients: Record<string, string> = {
    light: "#f0f0f0",
    dark: "#1a1a1a",
    neon: "linear-gradient(135deg, #00ffe0, #00ffbb)",
    pastel: "linear-gradient(135deg, #fcd1f7, #b1c7f0)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: currentTheme.background,
        color: currentTheme.textColor,
        transition: "background 0.5s, color 0.5s",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>
          TaskMaster
        </h1>

        {/* DROPDOWN DE TEMAS */}
        <div ref={ref} style={{ position: "relative", minWidth: "150px" }}>
          {/* BOTÃO PRINCIPAL */}
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "2px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              background: gradients[themeKey],
              color: themeKey === "light" ? "#333" : "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              transition: "all 0.3s, background 0.5s",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.background = hoverGradients[themeKey];
              btn.style.transform = "scale(1.05)";
              btn.style.boxShadow = "0 8px 24px rgba(0,0,0,0.45)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.background = gradients[themeKey];
              btn.style.transform = "scale(1)";
              btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FontAwesomeIcon icon={themeIcons[themeKey]} />
              {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                transition: "0.3s",
              }}
            />
          </button>

          {/* DROPDOWN */}
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                right: 0,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                zIndex: 1000,
              }}
            >
              {Object.entries(themes).map(([key, themeObj]) => {
                const isActive = key === themeKey;

                return (
                  <button
                    key={key}
                    onClick={() => {
                      setThemeKey(key);
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 16px",
                      border: "none",
                      width: "100%",
                      background: gradients[key],
                      color: key === "light" ? "#333" : "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transform: isActive ? "scale(1.03)" : "scale(1)",
                      animation: isActive ? "pulse 1.5s infinite" : "none",
                      transition: "all 0.3s, background 0.5s",
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget;
                      btn.style.background = hoverGradients[key];
                      btn.style.transform = "scale(1.05)";
                      btn.style.boxShadow = "0 8px 24px rgba(0,0,0,0.45)";
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget;
                      btn.style.background = gradients[key];
                      btn.style.transform = isActive ? "scale(1.03)" : "scale(1)";
                      btn.style.boxShadow = "none";
                    }}
                  >
                    <FontAwesomeIcon icon={themeIcons[key]} />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* CONTEÚDO */}
      <main style={{ flex: 1, padding: "40px 20px" }}>
        <TodoBoard theme={currentTheme} />
      </main>

      {/* FOOTER */}
      <footer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "20px",
          borderTop: `1px solid ${currentTheme.textColor}20`,
          fontSize: "0.9rem",
        }}
      >
        <span>© 2025 TaskMaster.</span>
        <span>Developed by</span>
        <a
          href="https://lucastec.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            color: currentTheme.textColor,
            textDecoration: "none",
            gap: "6px",
          }}
        >
          <img
            src="https://lucastec.vercel.app/img/LogoNome.png"
            alt="LucasTec"
            style={{ width: "100px", height: "40px" }}
          />
        </a>
      </footer>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
          50% { transform: scale(1.07); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          100% { transform: scale(1); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
        }
      `}</style>
    </div>
  );
};

export default App;
