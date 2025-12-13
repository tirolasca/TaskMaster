import React, { useState, useEffect } from "react";
import TodoBoard from "./components/TodoBoard";
import { lightTheme, darkTheme, Theme } from "./components/theme";

const App: React.FC = () => {
  /* ===== TEMA PERSISTENTE ===== */
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const theme: Theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.background,
        color: theme.textColor,
        transition: "background 0.3s, color 0.3s",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* ===== HEADER ===== */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>
          TaskMaster
        </h1>

        <button
          onClick={() => setIsDark((prev) => !prev)}
          style={{
            padding: "10px 18px",
            backgroundColor: theme.buttonBg,
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.9rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          {isDark ? "🌞 Tema Claro" : "🌙 Tema Escuro"}
        </button>
      </header>

      {/* ===== CONTEÚDO ===== */}
      <main style={{ flex: 1, padding: "40px 20px" }}>
        <TodoBoard theme={theme} />
      </main>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "20px",
          borderTop: `1px solid ${theme.textColor}20`,
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
            color: theme.textColor,
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
    </div>
  );
};

export default App;
