import React, { useState, useEffect } from "react";
import TodoColumn from "./TodoColumn";
import Snackbar from "./Snackbar";
import PriorityDropdown from "./PriorityDropdown";
import { Theme } from "./theme";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faPlus, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { requestNotificationPermission, notifyTask } from "../utils/notifications";
import { suggestPriority } from "../utils/AiPriority";
import { addHistory } from "../utils/AiHistory";

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
const columns: { key: Priority }[] = [
  { key: "high" },
  { key: "medium" },
  { key: "low" },
];

const TodoBoard: React.FC<Props> = ({ theme }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [priorityLocked, setPriorityLocked] = useState(false);
  const [undoTodo, setUndoTodo] = useState<Todo | null>(null);

  /* ===== NOTIFICAÇÕES ===== */
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  /* ===== IA: SUGERE, NÃO SOBRESCREVE + histórico ===== */
  useEffect(() => {
    if (!priorityLocked && newTask.trim()) {
      const suggested = suggestPriority(newTask);
      if (suggested) {
        setPriority(suggested);
        addHistory(newTask, suggested);
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
  const addTodo = async () => {
    if (!newTask.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      task: newTask,
      done: false,
      priority,
    };

    setTodos((prev) => [todo, ...prev]);
    setNewTask("");
    setPriorityLocked(false);

    // ⚡ Notificação inteligente apenas para alta prioridade
    if (priority === "high") {
      await notifyTask({
        body: `🔥 Tarefa de ALTA prioridade: ${todo.task}`,
        title: "TaskMaster",
        onClick: () => window.focus(), // foco na aba quando clicar na notificação
      });
    }
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
    <DndProvider backend={HTML5Backend}>
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
          <FontAwesomeIcon icon={faListCheck} /> TaskMaster
        </h2>

        {/* INPUT */}
        <div
          className="todo-input-row"
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "22px",
            flexWrap: "wrap",
          }}
        >
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
              setPriorityLocked(true);
            }}
          />

          {!priorityLocked && newTask.trim() && suggestPriority(newTask) && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              style={{
                marginLeft: "8px",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontWeight: "bold",
                color: "#fff",
                background:
                  suggestPriority(newTask) === "high"
                    ? "#ff5252"
                    : suggestPriority(newTask) === "medium"
                    ? "#ffb300"
                    : "#4caf50",
              }}
            >
              {`🤖 IA sugere: ${
                suggestPriority(newTask) === "high"
                  ? "Alta prioridade"
                  : suggestPriority(newTask) === "medium"
                  ? "Média prioridade"
                  : "Baixa prioridade"
              }`}
            </motion.span>
          )}

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
          className="todo-grid"
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
              onReorder={(newOrder: Todo[]) => {
                setTodos((prev) => {
                  // mantém os itens de outras prioridades
                  const others = prev.filter((t) => t.priority !== col.key);
                  // retorna todos juntos
                  return [...others, ...newOrder];
                });
              }}
              onChangePriority={(id: number, newPriority: Priority) =>
                setTodos((prev) =>
                  prev.map((t) =>
                    t.id === id ? { ...t, priority: newPriority } : t
                  )
                )
              }
            />
          ))}
        </div>

        {/* FOOTER */}
        <p style={{ textAlign: "center", marginTop: "22px" }}>
          <FontAwesomeIcon icon={faCircleCheck} /> Concluídas: {completedCount} / {todos.length}
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
    </DndProvider>
  );
};

export default TodoBoard;
