import { Priority } from "../components/TodoBoard";

type Rule = {
  words: string[];
  priority: Priority;
};

const rules: Rule[] = [
  { words: ["urgente", "hoje", "agora", "prazo"], priority: "high" },
  { words: ["importante", "amanhã"], priority: "medium" },
  { words: ["depois", "qualquer dia", "quando der"], priority: "low" },
];

export const suggestPriority = (text: string): Priority | null => {
  const lower = text.toLowerCase();

  for (const rule of rules) {
    if (rule.words.some((word) => lower.includes(word))) {
      return rule.priority;
    }
  }

  return null; // 👈 sem sugestão
};
