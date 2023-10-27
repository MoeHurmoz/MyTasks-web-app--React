import * as MUI from "../imports/MUI-Imports";

export default function FormDialog({
  title = "تعديل المهمة",
  confirmBtnName = "تأكيد",
  open,
  close,
  titleValue,
  detailsValue,
  handleTitleChange,
  handleDetailsChange,
  handleConfirmClick,
}) {
  return (
    <>
      <MUI.Dialog open={open} onClose={close} dir="rtl">
        <MUI.DialogTitle>{title}</MUI.DialogTitle>
        <MUI.DialogContent>
          <MUI.TextField
            margin="dense"
            id="title"
            label="العنوان"
            type="text"
            fullWidth
            inputProps={{ style: { lineHeight: "36px", height: "35px" } }}
            variant="standard"
            required
            placeholder="العنوان مطلوب"
            value={titleValue}
            onChange={handleTitleChange}
          />
          <MUI.TextField
            margin="dense"
            id="details"
            label="التفاصيل"
            type="text"
            multiline
            fullWidth
            inputProps={{ style: { lineHeight: "36px" } }}
            variant="standard"
            value={detailsValue}
            onChange={handleDetailsChange}
          />
        </MUI.DialogContent>
        <MUI.DialogActions>
          <MUI.Button onClick={close}>إلغاء</MUI.Button>
          <MUI.Button
            onClick={handleConfirmClick}
            disabled={!/\S/.test(titleValue)}
          >
            {confirmBtnName}
          </MUI.Button>
        </MUI.DialogActions>
      </MUI.Dialog>
    </>
  );
}
