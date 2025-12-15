export type Theme = {
  background: string;           // Fundo principal
  itemBackground: string;       // Fundo dos cards
  completedBackground: string;  // Fundo cards concluídos
  textColor: string;            // Texto principal
  buttonBg: string;             // Cor botão
  buttonHover: string;          // Hover do botão
  shadow?: string;              // Sombra cards
  badgeBgHigh?: string;         // Badge alta prioridade
  badgeBgMedium?: string;       // Badge média prioridade
  badgeBgLow?: string;          // Badge baixa prioridade
};

// ===== Cores de prioridade padrão =====
export const priorityColors = {
  high: "#ff5252",
  medium: "#ffb300",
  low: "#4caf50",
};

// ===== Tema Claro =====
export const lightTheme: Theme = {
  background: "linear-gradient(145deg, #f7f7f7, #ffffff)",
  itemBackground: "#ffffff",
  completedBackground: "#d1ffd6",
  textColor: "#000000",
  buttonBg: "#4caf50",
  buttonHover: "#45a049",
  shadow: "0 8px 24px rgba(0,0,0,0.12)",
  badgeBgHigh: "#ffcccc44",
  badgeBgMedium: "#ffe59944",
  badgeBgLow: "#ccffcc44",
};

// ===== Tema Escuro AMOLED =====
export const darkTheme: Theme = {
  background: "linear-gradient(145deg, #000000, #121212)",
  itemBackground: "#1e1e1e",
  completedBackground: "#1b5e20",
  textColor: "#ffffff",
  buttonBg: "#1e88e5",
  buttonHover: "#1565c0",
  shadow: "0 8px 24px rgba(0,0,0,0.45)",
  badgeBgHigh: "#ff525255",
  badgeBgMedium: "#ffb30055",
  badgeBgLow: "#4caf5055",
};

// ===== Tema Neon =====
export const neonTheme: Theme = {
  background: "linear-gradient(135deg, #0a0a0a, #111111)",
  itemBackground: "#111",
  completedBackground: "#004d40",
  textColor: "#00ffc3",
  buttonBg: "#00ffc3",
  buttonHover: "#00e0b8",
  shadow: "0 10px 30px rgba(0,255,195,0.2)",
  badgeBgHigh: "#ff004455",
  badgeBgMedium: "#00ff9944",
  badgeBgLow: "#00ff5544",
};

// ===== Tema Pastel =====
export const pastelTheme: Theme = {
  background: "linear-gradient(145deg, #fdf6f0, #f0f4ff)",
  itemBackground: "#ffffff",
  completedBackground: "#d6f0d6",
  textColor: "#333333",
  buttonBg: "#ffb74d",
  buttonHover: "#ffa726",
  shadow: "0 6px 20px rgba(0,0,0,0.1)",
  badgeBgHigh: "#ffc9c944",
  badgeBgMedium: "#fff1b544",
  badgeBgLow: "#c9ffc944",
};

// ===== Export de temas prontos =====
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  neon: neonTheme,
  pastel: pastelTheme,
};
