import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Theme } from "./theme";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

type Todo = {
  id: number;
  task: string;
  done: boolean;
};

type Props = {
  theme: Theme;
};

const TodoList: React.FC<Props> = ({ theme }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [pulseId, setPulseId] = useState<number | null>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTask.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      task: newTask,
      done: false,
    };

    setTodos([...todos, todo]);
    setNewTask("");
    setPulseId(todo.id);
    setTimeout(() => setPulseId(null), 300);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.done).length;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setTodos(items);
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "20px auto",
        padding: "25px",
        borderRadius: "16px",
        background: theme.background, // <- fundo muda com tema
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: theme.textColor, // <- h2 muda com tema
          transition: "color 0.3s",
        }}
      >
        Minha Lista de Tarefas
      </h2>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px 0 0 8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
            backgroundColor: theme.itemBackground, // <- input muda com tema
            color: theme.textColor,
          }}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "12px 18px",
            backgroundColor: theme.buttonBg,
            color: "#fff",
            border: "none",
            borderRadius: "0 8px 8px 0",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = theme.buttonHover)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = theme.buttonBg)
          }
        >
          Adicionar
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none", padding: 0 }}
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        task={todo.task}
                        done={todo.done}
                        onToggle={() => toggleTodo(todo.id)}
                        onRemove={() => removeTodo(todo.id)}
                        theme={theme} // <- passa o tema
                        style={{
                          transform:
                            pulseId === todo.id ? "scale(1.05)" : "scale(1)",
                          transition: "transform 0.3s",
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: theme.textColor, // <- p muda com tema
          fontWeight: "bold",
          transition: "color 0.3s",
        }}
      >
        Concluídas: {completedCount} / {todos.length}
      </p>
    </div>
  );
};

export default TodoList;
