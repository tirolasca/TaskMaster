import { motion, Reorder } from "framer-motion";
import TodoItem from "./TodoItem";
import { Theme } from "./theme";
import { Todo, Priority } from "./TodoBoard";

const labels: Record<Priority, string> = {
  high: "🔥 Alta Prioridade",
  medium: "⚡ Média Prioridade",
  low: "⬇️ Baixa Prioridade",
};

const glow: Record<Priority, string> = {
  high: "0 0 25px rgba(255,82,82,0.4)",
  medium: "0 0 25px rgba(255,179,0,0.4)",
  low: "0 0 25px rgba(76,175,80,0.4)",
};

type Props = {
  priority: Priority;
  todos: Todo[];
  theme: Theme;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onReorder: (todos: Todo[]) => void; // 🔥 importante
};

const TodoColumn: React.FC<Props> = ({
  priority,
  todos,
  theme,
  onToggle,
  onRemove,
  onReorder,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        background: theme.itemBackground,
        borderRadius: "18px",
        padding: "14px",
        boxShadow: glow[priority],
        minHeight: "120px",
      }}
    >
      {/* ===== HEADER ===== */}
      <h3
        style={{
          textAlign: "center",
          marginBottom: "12px",
          color: theme.textColor,
          fontWeight: "bold",
        }}
      >
        {labels[priority]}
      </h3>

      {/* ===== LISTA ===== */}
      <Reorder.Group
        axis="y"
        values={todos}
        onReorder={onReorder}
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {todos.map((todo) => (
          <Reorder.Item
            key={todo.id}
            value={todo}
            style={{ listStyle: "none" }}
          >
            <TodoItem
              task={todo.task}
              done={todo.done}
              priority={todo.priority}
              theme={theme}
              onToggle={() => onToggle(todo.id)}
              onRemove={() => onRemove(todo.id)}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </motion.div>
  );
};

export default TodoColumn;
