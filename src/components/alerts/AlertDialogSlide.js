import { forwardRef } from "../../imports/React-Imports";
import * as MUI from "../../imports/MUI-Imports";

const Transition = forwardRef(function Transition(props, ref) {
  return <MUI.Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  close,
  handleConfirmClick,
  title = "هل أنت متأكد من رغبتك في حذف المهمة؟",
  content = "لا يمكنك التراجع عن الحذف بعد إتمامه",
  confirmBtnName = "نعم, قم بالحذف",
}) {
  return (
    <MUI.Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
      aria-describedby="alert-dialog-slide-description"
      dir="rtl"
    >
      <MUI.DialogTitle>{title}</MUI.DialogTitle>
      <MUI.DialogContent>
        <MUI.DialogContentText id="alert-dialog-slide-description">
          {content}
        </MUI.DialogContentText>
      </MUI.DialogContent>
      <MUI.DialogActions>
        <MUI.Button onClick={close}>إغلاق</MUI.Button>
        <MUI.Button onClick={handleConfirmClick} color="error">
          {confirmBtnName}
        </MUI.Button>
      </MUI.DialogActions>
    </MUI.Dialog>
  );
}
