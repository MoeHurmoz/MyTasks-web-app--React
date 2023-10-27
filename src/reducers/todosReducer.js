import { v4 as uuid } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuid(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };

      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      let updatedTodos = [];

      if (action.payload.one) {
        updatedTodos = currentTodos.filter((todo) => {
          return todo.id !== action.payload.id;
        });
      }

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "edited": {
      let details = action.payload.details;
      const notEmpty = /\S/.test(details);
      if (!notEmpty) {
        details = "";
      }
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo = {
            ...todo,
            title: action.payload.title,
            details: details.replace(/(?<=\S)\s+(?!\S)$/, ""),
          };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "doneToggled": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === action.payload) {
          todo = {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    default:
      throw Error(`"${action.type}" is Unknown Action`);
  }
}
