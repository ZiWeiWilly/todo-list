import { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Todo } from "./todo.types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const priorityOption = ["Low", "Middle", "High"];

type TodoEditDialogProps = {
  editTodoItem: Todo;
  refresh: () => void;
  show: boolean;
  close: () => void;
};

export const TodoEditDialog = (props: TodoEditDialogProps) => {
  if (!props.show) {
    return null
  }

  const [todoItem, setTodoItem] = useState<Todo>(props.editTodoItem);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodoItem(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSave = () => {
    const body = todoItem;

    fetch(`http://127.0.0.1:8000/api/todos/${props.editTodoItem?.id}/update/`, {
      method: "PATCH",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => props.refresh())
      .catch((error) => console.log("error", error));

    props.close();
  };

  const handleCancel = () => {
    props.close();
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>編輯待辦事項</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: "5px" }}>
          <Grid item xs={12}>
            <TextField
              label="標題"
              size="small"
              name="title"
              value={todoItem.title}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <TextField
                label="內容"
                size="small"
                name="content"
                value={todoItem.content}
                onChange={handleChange}
                fullWidth
                multiline
                rows="8"
              />
            </Grid>
          </Grid>
          <Grid item container xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="截止日"
                size="small"
                type="date"
                name="due"
                value={todoItem.due}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="地點"
                size="small"
                name="place"
                value={todoItem.place}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="標籤"
                size="small"
                name="flag"
                value={todoItem.flag}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="重要度"
                size="small"
                select
                name="priority"
                value={todoItem.priority}
                onChange={handleChange}
                defaultValue="Low"
                fullWidth
              >
                {priorityOption.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>保存</Button>
        <Button onClick={handleCancel}>取消</Button>
      </DialogActions>
    </Dialog>
  );
};
