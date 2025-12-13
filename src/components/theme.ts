export type Theme = {
  background: string;           // Fundo do container principal
  itemBackground: string;       // Fundo dos cards de tarefas
  completedBackground: string;  // Fundo dos cards concluídos
  textColor: string;            // Cor do texto principal
  buttonBg: string;             // Cor do botão adicionar
  buttonHover: string;          // Cor do botão ao passar o mouse
};

// Tema claro
export const lightTheme: Theme = {
  background: "linear-gradient(145deg, #f7f7f7, #ffffff)",
  itemBackground: "#ffffff",
  completedBackground: "#d1ffd6",
  textColor: "#000000",
  buttonBg: "#4caf50",
  buttonHover: "#45a049",
};

// Tema escuro AMOLED
export const darkTheme: Theme = {
  background: "#000000",          // fundo totalmente preto
  itemBackground: "#121212",      // card um pouco mais claro que o fundo
  completedBackground: "#1b5e20", // verde escuro para tarefas concluídas
  textColor: "#ffffff",           // texto branco para contraste
  buttonBg: "#1e88e5",            // azul para botão
  buttonHover: "#1565c0",         // azul mais escuro no hover
};
