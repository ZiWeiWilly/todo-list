import { ChangeEvent, useEffect, useState } from "react";
import Container from "@mui/material/Container";

import { Todo } from "./todo.types";
import { TodoAddDialog } from "./TodoAddDialog";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { TodoItem } from "./TodoItem";

const sortBy = [
  {
    text: "建立日期 - 舊到新",
    value: "id",
  },
  {
    text: "建立日期 - 新到舊",
    value: "-id",
  },
  {
    text: "逾期日期",
    value: "due",
  },
];

export const TodoList = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([] as Todo[]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [order, setOrder] = useState("id");
  const [keyword, setKeyword] = useState("");

  const handleFetchTodoItem = () => {
    fetch(
      `http://127.0.0.1:8000/api/todos/?ordering=${order}&search=${keyword}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setTodoItems(result);
      })
      .catch((error) => console.log("error", error));
  };

  const handleOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrder(event.target.value);
    handleFetchTodoItem();
  };
  useEffect(() => {
    handleFetchTodoItem();
  }, [order, keyword]);

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: "5px 15px 15px 15px" }}>
          <h3>
            待辦事項
            <Tooltip title="Refresh" placement="top" arrow>
              <IconButton onClick={handleFetchTodoItem}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </h3>
          <TextField
            label="排序"
            value={order}
            select
            onChange={handleOrderChange}
            sx={{ margin: "0 5px 5px 0" }}
          >
            {sortBy.map((o) => (
              <MenuItem value={o.value}>{o.text}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="關鍵字搜尋"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div
            style={{
              minHeight: "60px",
              maxHeight: "65vh",
              overflowY: "auto",
              border: "1px solid lightgrey",
              padding: "15px",
            }}
          >
            {todoItems.map((item) => (
              <TodoItem key={item.id} item={item} refresh={handleFetchTodoItem} />
            ))}
          </div>
          <Button
            variant="outlined"
            onClick={() => setShowAddDialog(true)}
            sx={{ marginTop: "10px" }}
          >
            新增
          </Button>
        </Paper>
      </Container>
      <TodoAddDialog
        show={showAddDialog}
        close={() => setShowAddDialog(false)}
        refresh={handleFetchTodoItem}
      />
    </>
  );
};
