import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
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
  close: () => void;
};

export const TodoEditDialog = (props: TodoEditDialogProps) => {
  const [title, setTitle] = useState(props.editTodoItem.title);
  const [content, setContent] = useState(props.editTodoItem.content);
  const [due, setDue] = useState(props.editTodoItem.due);
  const [place, setPlace] = useState(props.editTodoItem.place);
  const [flag, setFlag] = useState(props.editTodoItem.flag);
  const [priority, setProprity] = useState<Todo["priority"]>(
    props.editTodoItem.priority
  );

  const handleSave = () => {
    const body = {
      title: title,
      content: content,
      due: due,
      place: place,
      flag: flag,
      priority: priority,
    };

    fetch(`http://127.0.0.1:8000/api/todos/${props.editTodoItem.id}/update/`, {
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="標題"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="內容"
              size="small"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="截止日"
              size="small"
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="地點"
              size="small"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="標籤"
              size="small"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="重要度"
              size="small"
              select
              value={priority}
              onChange={(e) => setProprity(e.target.value as Todo["priority"])}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
