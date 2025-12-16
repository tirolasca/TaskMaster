import { Priority } from "../components/TodoBoard";

type WeightedWord = {
  word: string;
  weight: number;
};

type Rule = {
  words: WeightedWord[];
  priority: Priority;
};

/* =======================
   REGRAS DA IA
======================= */
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

/* =======================
   NORMALIZA TEXTO
======================= */
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/* =======================
   SUGESTÃO DE PRIORIDADE
======================= */
export const suggestPriority = (text: string): Priority | null => {
  const normalizedText = normalize(text);

  const scores: Record<Priority, number> = {
    high: 0,
    medium: 0,
    low: 0,
  };

  for (const rule of rules) {
    for (const { word, weight } of rule.words) {
      const normalizedWord = normalize(word);
      const regex = new RegExp(`\\b${normalizedWord}\\b`, "gi");
      const matches = normalizedText.match(regex);
      if (matches) {
        scores[rule.priority] += matches.length * weight;
      }
    }
  }

  const maxScore = Math.max(scores.high, scores.medium, scores.low);
  if (maxScore === 0) return null;

  if (scores.high === maxScore) return "high";
  if (scores.medium === maxScore) return "medium";
  return "low";
};

/* =======================
   DETECTA PALAVRA-CHAVE
   (para tooltip / highlight)
======================= */
export const detectKeyword = (text: string): string | null => {
  const normalizedText = normalize(text);

  for (const rule of rules) {
    for (const { word } of rule.words) {
      const normalizedWord = normalize(word);
      const regex = new RegExp(`\\b${normalizedWord}\\b`, "i");
      if (regex.test(normalizedText)) {
        return word; // retorna a palavra original
      }
    }
  }

  return null;
};
export const keywordMap = [
  {
    priority: "high",
    words: ["urgente", "hoje", "agora", "prazo", "imediato"],
  },
  {
    priority: "medium",
    words: ["importante", "amanhã", "necessário"],
  },
  {
    priority: "low",
    words: ["depois", "qualquer dia", "quando der", "mais tarde"],
  },
];



