import {
  createContext,
  useContext,
  useReducer,
} from "../imports/React-Imports";
import todosReducer from "../reducers/todosReducer";

const TodosContext = createContext([]);
const dispatchContext = createContext([]);

// CUSTOM HOOKS:
export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(dispatchContext);

// INITIAL TODOS DATA FROM LOCAL STORAGE:
const todosData = JSON.parse(localStorage.getItem("todos")) ?? [];

// PROVIDER COMPONENT:
export const TodosProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(todosReducer, todosData);

  return (
    <TodosContext.Provider value={todos}>
      <dispatchContext.Provider value={todosDispatch}>
        {children}
      </dispatchContext.Provider>
    </TodosContext.Provider>
  );
};
