import React from "react";
import { Theme } from "./Theme";
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
import { useDrag } from "react-dnd";
import { Priority, Todo } from "./TodoBoard";

type TodoItemProps = {
  todo: Todo; // objeto completo
  onToggle: () => void;
  onRemove: () => void;
  theme: Theme;
};

const priorityConfig = {
  high: { icon: faArrowUp, color: "#ff5252", label: "Alta" },
  medium: { icon: faMinus, color: "#ffb300", label: "Média" },
  low: { icon: faArrowDown, color: "#4caf50", label: "Baixa" },
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onRemove,
  theme,
}) => {
  const p = priorityConfig[todo.priority as Priority];

  // Hook do react-dnd para arrastar
  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: todo,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.li
      ref={drag}
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
        background: todo.done
          ? `${theme.completedBackground}CC`
          : theme.itemBackground,
        color: theme.textColor,
        boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
        borderLeft: `5px solid ${p.color}`,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      {/* DRAG INDICATOR */}
      <FontAwesomeIcon icon={faGripVertical} style={{ opacity: 0.35 }} />

      {/* TEXTO */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flex: 1,
          cursor: "pointer",
          textDecoration: todo.done ? "line-through" : "none",
          opacity: todo.done ? 0.7 : 1,
        }}
      >
        <motion.span
          initial={false}
          animate={{ scale: todo.done ? 1 : 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <FontAwesomeIcon
            icon={todo.done ? faCheckCircle : faCircle}
            color={todo.done ? theme.textColor : "#666"}
          />
        </motion.span>

        <span>{todo.task}</span>
      </div>

      {/* AÇÕES */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!todo.done && (
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
