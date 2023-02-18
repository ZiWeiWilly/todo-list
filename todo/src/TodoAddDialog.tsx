import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Todo } from "./todo.types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const priorityOption = ["Low", "Middle", "High"];

type TodoAddDialogProps = {
  refresh: () => void;
  close: () => void;
};

export const TodoAddDialog = (props: TodoAddDialogProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [due, setDue] = useState("");
  const [place, setPlace] = useState("");
  const [flag, setFlag] = useState("");
  const [priority, setProprity] = useState<Todo["priority"]>("Low");

  const resetAddition = () => {
    setTitle("");
    setContent("");
    setDue("");
    setPlace("");
    setFlag("");
    setProprity("Low");
  };

  const handleSave = (createNext: boolean = false) => {
    const body = {
      title: title,
      content: content,
      due: due,
      place: place,
      flag: flag,
      priority: priority,
      isCompleted: false,
    };

    fetch("http://127.0.0.1:8000/api/todos/", {
      method: "POST",
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

    if (createNext) {
      resetAddition();
    } else {
      props.close();
    }
  };

  return (
    <Dialog open={true} onClose={props.close}>
      <DialogTitle>新增待辦事項</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSave(true)}>Save & Create Another</Button>
        <Button onClick={() => handleSave()}>Save</Button>
        <Button onClick={props.close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
