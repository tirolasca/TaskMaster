import { Priority } from "../components/TodoBoard";

type Rule = {
  words: { word: string; weight: number }[];
  priority: Priority;
};

// Define palavras com peso (quanto maior, mais importante)
const rules: Rule[] = [
  {
    priority: "high",
    words: [
      { word: "urgente", weight: 5 },
      { word: "hoje", weight: 3 },
      { word: "agora", weight: 4 },
      { word: "prazo", weight: 4 },
      { word: "imediato", weight: 5 },
    ],
  },
  {
    priority: "medium",
    words: [
      { word: "importante", weight: 3 },
      { word: "amanhã", weight: 2 },
      { word: "necessário", weight: 3 },
    ],
  },
  {
    priority: "low",
    words: [
      { word: "depois", weight: 1 },
      { word: "qualquer dia", weight: 1 },
      { word: "quando der", weight: 1 },
      { word: "mais tarde", weight: 1 },
    ],
  },
];

// Normaliza texto removendo acentos e transformando em minúsculas
const normalize = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const suggestPriority = (text: string): Priority | null => {
  const normalizedText = normalize(text);

  // Pontuação acumulada por prioridade
  const scores: Record<Priority, number> = { high: 0, medium: 0, low: 0 };

  for (const rule of rules) {
    for (const { word, weight } of rule.words) {
      const normalizedWord = normalize(word);
      const regex = new RegExp(`\\b${normalizedWord}\\b`, "gi"); // palavra inteira
      const matches = normalizedText.match(regex);
      if (matches) scores[rule.priority] += matches.length * weight;
    }
  }

  // Determina a prioridade com maior pontuação
  const maxScore = Math.max(scores.high, scores.medium, scores.low);
  if (maxScore === 0) return null; // nenhuma palavra encontrada

  if (scores.high === maxScore) return "high";
  if (scores.medium === maxScore) return "medium";
  return "low";
};
