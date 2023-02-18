import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

type TodoDelteDialog = {
  itemId: number;
  close: () => void;
  refresh: () => void;
};

export const TodoDeleteDialog = (props: TodoDelteDialog) => {
  const handleConfirm = () => {
    fetch(`http://127.0.0.1:8000/api/todos/${props.itemId}/delete/`, {
      method: "DELETE",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => props.refresh)
      .catch((error) => console.log("error", error));

    props.close();
  };

  return (
    <Dialog open={props.itemId !== null} onClose={props.close}>
      <DialogTitle>刪除待辦事項</DialogTitle>
      <DialogContent>
        <DialogContentText>確定要刪除待辦事項嗎？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>確定</Button>
        <Button onClick={props.close}>取消</Button>
      </DialogActions>
    </Dialog>
  );
};
