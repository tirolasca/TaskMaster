import React, { useState, useEffect } from "react";
import TodoColumn from "./TodoColumn";
import Snackbar from "./Snackbar";
import PriorityDropdown from "./PriorityDropdown";
import { Theme } from "./theme";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faPlus,
  faFire,
  faGaugeHigh,
  faArrowDown,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import {
  requestNotificationPermission,
  notifyTask,
} from "../utils/notifications";

import { suggestPriority } from "../utils/AiPriority";

/* ===== TYPES ===== */
export type Priority = "high" | "medium" | "low";

export type Todo = {
  id: number;
  task: string;
  done: boolean;
  priority: Priority;
};

type Props = {
  theme: Theme;
};

/* ===== COLUNAS ===== */
const columns: {
  key: Priority;
  icon: any;
  color: string;
}[] = [
  { key: "high", icon: faFire, color: "#ff5252" },
  { key: "medium", icon: faGaugeHigh, color: "#ffb300" },
  { key: "low", icon: faArrowDown, color: "#4caf50" },
];

const TodoBoard: React.FC<Props> = ({ theme }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  // 🔒 trava quando usuário escolhe manualmente
  const [priorityLocked, setPriorityLocked] = useState(false);

  const [undoTodo, setUndoTodo] = useState<Todo | null>(null);

  /* ===== NOTIFICAÇÕES ===== */
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  /* ===== IA: SUGERE, NÃO SOBRESCREVE ===== */
  useEffect(() => {
    if (!priorityLocked && newTask.trim()) {
      const suggestion = suggestPriority(newTask);
      if (suggestion) {
        setPriority(suggestion);
      }
    }
  }, [newTask, priorityLocked]);

  /* ===== PERSISTÊNCIA ===== */
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* ===== AÇÕES ===== */
  const addTodo = () => {
    if (!newTask.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      task: newTask,
      done: false,
      priority,
    };

    setTodos((prev) => [todo, ...prev]);
    setNewTask("");
    setPriorityLocked(false); // 🔓 libera IA para próxima tarefa

    notifyTask(`Nova tarefa: ${todo.task}`);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => {
      const removed = prev.find((t) => t.id === id);
      if (removed) setUndoTodo(removed);
      return prev.filter((t) => t.id !== id);
    });
  };

  const undoRemove = () => {
    if (!undoTodo) return;
    setTodos((prev) => [undoTodo, ...prev]);
    setUndoTodo(null);
  };

  const completedCount = todos.filter((t) => t.done).length;

  /* ===== UI ===== */
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
          padding: "26px",
          borderRadius: "18px",
          background: theme.background,
          boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* HEADER */}
        <h2
          style={{
            textAlign: "center",
            color: theme.textColor,
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          <FontAwesomeIcon icon={faListCheck} />
          TaskMaster
        </h2>

        {/* INPUT */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "22px" }}>
          <input
            value={newTask}
            placeholder="Nova tarefa..."
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: "14px",
              border: `2px solid ${theme.buttonBg}`,
              background: theme.itemBackground,
              color: theme.textColor,
              outline: "none",
              transition: "0.25s",
            }}
          />

          <PriorityDropdown
            value={priority}
            theme={theme}
            onChange={(p) => {
              setPriority(p);
              setPriorityLocked(true); // 🔒 usuário manda agora
            }}
          />

          <button
            onClick={addTodo}
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              background: theme.buttonBg,
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* KANBAN */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "18px",
          }}
        >
          {columns.map((col) => (
            <TodoColumn
              key={col.key}
              priority={col.key}
              todos={todos.filter((t) => t.priority === col.key)}
              theme={theme}
              onToggle={toggleTodo}
              onRemove={removeTodo}
              onReorder={(newOrder) =>
                setTodos((prev) => [
                  ...prev.filter((t) => t.priority !== col.key),
                  ...newOrder,
                ])
              }
            />
          ))}
        </div>

        {/* FOOTER */}
        <p style={{ textAlign: "center", marginTop: "22px" }}>
          <FontAwesomeIcon icon={faCircleCheck} /> Concluídas: {completedCount} /{" "}
          {todos.length}
        </p>
      </motion.div>

      {/* SNACKBAR */}
      {undoTodo && (
        <Snackbar
          message="Tarefa removida"
          actionLabel="Desfazer"
          onAction={undoRemove}
          onClose={() => setUndoTodo(null)}
        />
      )}
    </>
  );
};

export default TodoBoard;
