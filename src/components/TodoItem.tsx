import React from "react";
import { Theme } from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheckCircle,
  faArrowUp,
  faMinus,
  faArrowDown,
  faCircle,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export type Priority = "high" | "medium" | "low";

type TodoItemProps = {
  task: string;
  done: boolean;
  priority: Priority;
  onToggle: () => void;
  onRemove: () => void;
  theme: Theme;
};

const priorityConfig = {
  high: {
    icon: faArrowUp,
    color: "#ff5252",
    label: "Alta",
  },
  medium: {
    icon: faMinus,
    color: "#ffb300",
    label: "Média",
  },
  low: {
    icon: faArrowDown,
    color: "#4caf50",
    label: "Baixa",
  },
};

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  done,
  priority,
  onToggle,
  onRemove,
  theme,
}) => {
  const p = priorityConfig[priority];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 16px",
        marginBottom: "12px",
        borderRadius: "16px",
        background: done
          ? `${theme.completedBackground}CC`
          : theme.itemBackground,
        color: theme.textColor,
        boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
        borderLeft: `5px solid ${p.color}`,
      }}
    >

      
      {/* ===== DRAG INDICATOR ===== */}
      <FontAwesomeIcon
        icon={faGripVertical}
        style={{ opacity: 0.35, cursor: "grab" }}
      />

      {/* ===== TEXTO ===== */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flex: 1,
          cursor: "pointer",
          textDecoration: done ? "line-through" : "none",
          opacity: done ? 0.7 : 1,
        }}
      >
        {/* STATUS ICON */}
        <motion.span
          initial={false}
          animate={{ scale: done ? 1 : 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <FontAwesomeIcon
            icon={done ? faCheckCircle : faCircle}
            color={done ? theme.textColor : "#666"}
          />
        </motion.span>

        <span>{task}</span>
      </div>

      {/* ===== AÇÕES ===== */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!done && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              background: `${p.color}22`,
              color: p.color,
              whiteSpace: "nowrap",
            }}
          >
            <FontAwesomeIcon icon={p.icon} />
            {p.label}
          </motion.span>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            background: "#ff4d4d",
            border: "none",
            borderRadius: "10px",
            padding: "8px 10px",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </motion.button>
      </div>
    </motion.li>
  );
};

export default TodoItem;
