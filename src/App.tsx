import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { lightTheme, darkTheme, Theme } from "./components/theme";

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.background,
        color: theme.textColor,
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold" }}>
          TaskMaster
        </h1>
        <button
          onClick={toggleTheme}
          style={{
            padding: "10px 18px",
            backgroundColor: theme.buttonBg,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.9rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = theme.buttonHover;
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = theme.buttonBg;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Trocar Tema
        </button>
      </header>

      {/* Conteúdo */}
      <main style={{ flex: 1, padding: "40px 20px" }}>
        <TodoList theme={theme} />
      </main>

     {/* Footer */}
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
      src="https://lucastec.vercel.app/img/LogoNome.png" // substitua pela URL real da imagem do portfólio
      alt="Meu Portfólio"
      style={{ width: "100px", height: "40px"}}
    />
  </a>
</footer>

    </div>
  );
};

export default App;
