import * as React from "../imports/React-Imports";
import * as MUI from "../imports/MUI-Imports";
import { useTodos, useTodosDispatch } from "../contexts/TodosContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import Todo from "./Todo";
import AlertDialogSlide from "./alerts/AlertDialogSlide";
import FormDialog from "./FormDialog";

export default function TodoList() {
  // CUSTOM HOOKS BY CONTEXT:
  const todos = useTodos();
  const todosDispatch = useTodosDispatch();
  const { showSnackbarAlert } = useSnackbar();

  // STATES:
  const [tasksFilterState, setTasksFilterState] = React.useState("not-done");
  const [titleInput, setTitleInput] = React.useState("");
  const [showDeleteAlert, setShowDeleteAlert] = React.useState({
    all: false,
    one: false,
  });
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [clickedTodo, setClickedTodo] = React.useState({});

  // EVENT HANDLERS:
  const handleTaskFilterChange = (event, newTasksFilterState) => {
    /* The second parameter is equal the new value of the state,
    and if the new value is the same as the old value,
    the value of the second parameter will be equal to null */

    // setTasksFilterState(newTasksFilterState);
    setTasksFilterState(event.target.value);
  };

  const handleAddClick = () => {
    todosDispatch({ type: "added", payload: { newTitle: titleInput } });
    setTitleInput("");
    showSnackbarAlert("أُضيفت المهمة");
    if (tasksFilterState === "done") {
      setTasksFilterState("not-done");
    }
  };

  // deletion:
  const handleDeleteAllClick = () => {
    setShowDeleteAlert({ all: true, one: false });
  };

  const handleDeleteClick = (currentTodo) => {
    setShowDeleteAlert({ all: false, one: true });
    setClickedTodo(currentTodo);
  };

  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert({ all: false, one: false });
  };

  const handleDeleteConfirmation = () => {
    todosDispatch({
      type: "deleted",
      payload: { one: showDeleteAlert.one, id: clickedTodo.id },
    });
    setShowDeleteAlert({ all: false, one: false });
    showDeleteAlert.one
      ? showSnackbarAlert("حُذفت المهمة")
      : showSnackbarAlert("جميع المهام حُذفت");
  };

  // edit:
  const handleEditClick = (currentTodo) => {
    setClickedTodo(currentTodo);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleTitleChange = (event) => {
    setClickedTodo({ ...clickedTodo, title: event.target.value });
  };

  const handleDetailsChange = (event) => {
    setClickedTodo({ ...clickedTodo, details: event.target.value });
  };

  const handleEditConfirm = () => {
    todosDispatch({ type: "edited", payload: clickedTodo });
    setShowEditForm(false);
    showSnackbarAlert("عُدلت المهمة");
  };

  // TODOS FILTERING:
  const notDoneTodos = React.useMemo(() => {
    return todos.filter((todo) => !todo.isCompleted);
  }, [todos]);

  const doneTodos = React.useMemo(() => {
    return todos.filter((todo) => todo.isCompleted);
  }, [todos]);

  const filteredList = React.useMemo(() => {
    switch (tasksFilterState) {
      case "not-done":
        return notDoneTodos;
      case "done":
        return doneTodos;
      default:
        return todos;
    }
  }, [tasksFilterState, notDoneTodos, doneTodos, todos]);

  // TODOS MAPPING:
  const todosList = filteredList.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      deleteClick={handleDeleteClick}
      editClick={handleEditClick}
    />
  ));

  return (
    <>
      {/* DELETION ALERT DIALOG */}
      {showDeleteAlert.all && (
        <AlertDialogSlide
          open={showDeleteAlert.all}
          close={handleCloseDeleteAlert}
          title="هل أنت متأكد من رغبتك في حذف جميع المهام؟"
          handleConfirmClick={handleDeleteConfirmation}
        />
      )}

      {showDeleteAlert.one && (
        <AlertDialogSlide
          open={showDeleteAlert.one}
          close={handleCloseDeleteAlert}
          handleConfirmClick={handleDeleteConfirmation}
        />
      )}
      {/* END OF DELETION ALERT DIALOG */}

      {/* FORM DIALOG OF EDITING*/}
      {showEditForm && (
        <FormDialog
          open={showEditForm}
          close={handleCloseEditForm}
          titleValue={clickedTodo.title}
          detailsValue={clickedTodo.details}
          handleTitleChange={handleTitleChange}
          handleDetailsChange={handleDetailsChange}
          handleConfirmClick={handleEditConfirm}
        />
      )}
      {/* END OF FORM DIALOG OF EDITING */}

      <MUI.Container maxWidth="sm">
        <MUI.Card sx={{ minWidth: 275, m: "4% 0" }}>
          <MUI.CardContent>
            <MUI.Typography variant="h3" fontWeight={"bold"}>
              مهامي
            </MUI.Typography>

            <MUI.Divider sx={{ mt: "35px" }} /* LIKE THE <hr/> */ />

            <MUI.Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* DELETE ALL TASKS BUTTON */}
              {todos.length > 1 && (
                <MUI.Button
                  color="error"
                  size="small"
                  startIcon={<MUI.DeleteOutlineIcon fontSize="inherit" />}
                  sx={{ mt: "10px" }}
                  onClick={handleDeleteAllClick}
                >
                  حذف جميع المهام
                </MUI.Button>
              )}
              {/* END OF DELETE ALL TASKS BUTTON */}

              {/* TASKS FILTER BUTTON */}
              <MUI.ToggleButtonGroup
                exclusive
                color="primary"
                value={tasksFilterState}
                onChange={handleTaskFilterChange}
                sx={{
                  direction: "ltr",
                  m: todos.length > 1 ? "10px 0px 20px" : "20px 0px",
                }}
              >
                <MUI.ToggleButton value="done">منجز</MUI.ToggleButton>
                <MUI.ToggleButton value="not-done">غير منجز</MUI.ToggleButton>
                <MUI.ToggleButton value="all">الكل</MUI.ToggleButton>
              </MUI.ToggleButtonGroup>
              {/* END OF TASKS FILTER BUTTON */}
            </MUI.Container>

            {/* ALL TASKS */}
            <div className="cardsContainer">
              {todosList.length > 0 ? (
                todosList
              ) : (
                <h2
                  style={{
                    margin: "0px 0px 10px",
                    fontWeight: "400",
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  لا توجد مهام
                </h2>
              )}
            </div>
            {/* END OF ALL TASKS */}
          </MUI.CardContent>

          {/* INPUT + ADD BUTTON */}
          <MUI.CardActions>
            <MUI.Grid container spacing={1}>
              <MUI.Grid item xs={8}>
                <MUI.TextField
                  label="عنوان المهمة"
                  variant="outlined"
                  fullWidth
                  inputProps={{ style: { lineHeight: "36px" } }}
                  value={titleInput}
                  onChange={(event) => setTitleInput(event.target.value)}
                />
              </MUI.Grid>
              <MUI.Grid item xs={4}>
                <MUI.Button
                  variant="contained"
                  fullWidth
                  sx={{ height: "100%" }}
                  onClick={handleAddClick}
                  disabled={!/\S/.test(titleInput)}
                >
                  إضافة
                </MUI.Button>
              </MUI.Grid>
            </MUI.Grid>
          </MUI.CardActions>
          {/* END OF INPUT + ADD BUTTON */}
        </MUI.Card>
      </MUI.Container>
    </>
  );
}
