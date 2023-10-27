import "./styles/App.css";
import { createTheme, ThemeProvider } from "./imports/MUI-Imports";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import { TodosProvider } from "./contexts/TodosContext";
import TodoList from "./components/TodoList";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#283593",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <div className="App">
          <TodosProvider>
            <TodoList />
          </TodosProvider>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
