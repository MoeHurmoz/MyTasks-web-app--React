import * as MUI from "../imports/MUI-Imports";
import { useTodosDispatch } from "../contexts/TodosContext";
import { useSnackbar } from "../contexts/SnackbarContext";

export default function Todo({ todo, deleteClick, editClick }) {
  const { id, title, details, isCompleted } = todo;

  // CUSTOM HOOKS BY CONTEXT:
  const todosDispatch = useTodosDispatch();
  const { showSnackbarAlert } = useSnackbar();

  // EVENT HANDLERS:
  const handleCheckClick = () => {
    todosDispatch({ type: "doneToggled", payload: id });
    !isCompleted
      ? showSnackbarAlert("تم إنجاز المهمة", "success")
      : showSnackbarAlert("أُرجعت كمهمة غير منجزة");
  };

  const handleDeleteClick = () => {
    deleteClick(todo);
  };

  const handleEditClick = () => {
    editClick(todo);
  };

  return (
    <MUI.Card
      className="todoCard"
      sx={{
        minWidth: 275,
        bgcolor: "#283593",
        color: "#e3f2fd",
      }}
    >
      <MUI.CardContent>
        <MUI.Grid container spacing={2}>
          {/* CARD CONTENT */}
          <MUI.Grid item xs={7.5} textAlign={"start"}>
            <MUI.Typography
              variant="h5"
              overflow={"auto"}
              sx={{ textDecoration: isCompleted && "line-through" }}
              lineHeight={"54px"}
            >
              {title}
            </MUI.Typography>
            <MUI.Typography
              color={"#bdbdbd"}
              overflow={"auto"}
              lineHeight={"36px"}
            >
              {details}
            </MUI.Typography>
          </MUI.Grid>
          {/* END OF CARD CONTENT */}

          {/* ACTION BUTTONS */}
          <MUI.Grid
            item
            xs={4.5}
            textAlign={"end"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <MUI.Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              useFlexGap
            >
              <MUI.IconButton
                onClick={handleCheckClick}
                className="iconButton"
                aria-label="done"
                sx={{
                  color: isCompleted ? "white" : "#8bc34a",
                  bgcolor: isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <MUI.CheckIcon />
              </MUI.IconButton>

              <MUI.IconButton
                onClick={handleEditClick}
                className="iconButton"
                aria-label="edit"
                sx={{
                  color: "#1769aa",
                  bgcolor: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <MUI.ModeEditOutlineOutlinedIcon />
              </MUI.IconButton>

              <MUI.IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#b23c17",
                  bgcolor: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <MUI.DeleteOutlineIcon />
              </MUI.IconButton>
            </MUI.Stack>
          </MUI.Grid>
          {/* END OF ACTION BUTTONS */}
        </MUI.Grid>
      </MUI.CardContent>
    </MUI.Card>
  );
}
