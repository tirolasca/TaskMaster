import React, { useState, useEffect, CSSProperties } from "react";
import { Theme } from "./theme";

type TodoItemProps = {
  task: string;
  done: boolean;
  onToggle: () => void;
  onRemove: () => void;
  theme: Theme;
  style?: CSSProperties;
};

const TodoItem: React.FC<TodoItemProps> = ({ task, done, onToggle, onRemove, theme, style }) => {
  const [fade, setFade] = useState(false);
  const [hover, setHover] = useState(false);

  const handleRemove = () => setFade(true);

  useEffect(() => {
    if (fade) {
      const timer = setTimeout(onRemove, 300);
      return () => clearTimeout(timer);
    }
  }, [fade, onRemove]);

  return (
    <li
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 18px",
        margin: "10px 0",
        backgroundColor: done ? theme.completedBackground : theme.itemBackground,
        color: theme.textColor,
        borderRadius: "12px",
        cursor: "pointer",
        textDecoration: done ? "line-through" : "none",
        boxShadow: hover
          ? "0 8px 20px rgba(0,0,0,0.15)"
          : "0 2px 8px rgba(0,0,0,0.08)",
        transition: "transform 0.2s, box-shadow 0.2s, opacity 0.3s",
        opacity: fade ? 0 : 1,
        transform: fade
          ? "scale(0.8)"
          : hover
          ? "scale(1.03)"
          : style?.transform || "scale(1)",
        borderLeft: done ? `4px solid ${theme.completedBackground}` : "4px solid #ccc",
        ...style,
      }}
    >
      <span style={{ flex: 1 }}>{task}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ff4d4d",
          border: "none",
          borderRadius: "6px",
          padding: "6px 12px",
          color: "#fff",
          cursor: "pointer",
          transition: "0.3s",
          fontWeight: "bold",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e04343")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff4d4d")}
      >
        <span style={{ marginRight: "6px" }}>🗑️</span> Remover
      </button>
    </li>
  );
};

export default TodoItem;
