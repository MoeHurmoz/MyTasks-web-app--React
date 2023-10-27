import { forwardRef } from "../../imports/React-Imports";
import { Snackbar, MuiAlert } from "../../imports/MUI-Imports";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarAlert({
  open,
  close,
  message,
  severity = "info",
}) {
  return (
    <Snackbar open={open} onClick={close}>
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
