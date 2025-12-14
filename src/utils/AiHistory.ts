import { Priority } from "../components/TodoBoard";

type Suggestion = {
  text: string;
  suggested: Priority;
};

let history: Suggestion[] = [];

export const addHistory = (text: string, suggested: Priority) => {
  history.push({ text, suggested });
};

export const getHistory = () => [...history];
