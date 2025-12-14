import React from "react";
import TodoItem from "./TodoItem";
import { Theme } from "./Theme";
import { Todo, Priority } from "./TodoBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faGaugeHigh,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDrop } from "react-dnd";
import { Reorder, motion } from "framer-motion";

const labels: Record<Priority, string> = {
  high: "Alta Prioridade",
  medium: "Média Prioridade",
  low: "Baixa Prioridade",
};

const colors: Record<Priority, string> = {
  high: "#ff5252",
  medium: "#ffb300",
  low: "#4caf50",
};

type Props = {
  priority: Priority;
  todos: Todo[];
  theme: Theme;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onChangePriority: (id: number, newPriority: Priority) => void;
  onReorder: (newOrder: Todo[]) => void; // reordenação dentro da coluna
};

const TodoColumn: React.FC<Props> = ({
  priority,
  todos,
  theme,
  onToggle,
  onRemove,
  onChangePriority,
  onReorder,
}) => {
  const [, drop] = useDrop({
    accept: "TODO",
    drop: (item: Todo) => {
      if (item.priority !== priority) {
        onChangePriority(item.id, priority);
      }
    },
  });

  return (
    <div
      ref={drop}
      style={{
        background: `linear-gradient(145deg, ${colors[priority]}22, ${colors[priority]}11)`,
        borderRadius: "18px",
        padding: "16px",
        boxShadow: `0 6px 20px ${colors[priority]}33`,
        minHeight: "140px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <h3
        style={{
          textAlign: "center",
          marginBottom: "12px",
          color: theme.textColor,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <FontAwesomeIcon
          icon={
            priority === "high"
              ? faFire
              : priority === "medium"
              ? faGaugeHigh
              : faArrowDown
          }
        />
        {labels[priority]}
      </h3>

      {/* LISTA COM REORDER */}
      <Reorder.Group
        axis="y"
        values={todos}
        onReorder={onReorder}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {todos.map((todo) => (
          <Reorder.Item
            key={todo.id}
            value={todo}
            style={{ listStyle: "none", outline: "none" }}
          >
            <TodoItem
              todo={todo}
              theme={theme}
              onToggle={() => onToggle(todo.id)}
              onRemove={() => onRemove(todo.id)}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default TodoColumn;
