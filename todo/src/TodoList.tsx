import { ChangeEvent, CSSProperties, useEffect, useState } from "react";
import Container from "@mui/material/Container";

import { Todo } from "./todo.types";
import { TodoAddDialog } from "./TodoAddDialog";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PlaceIcon from "@mui/icons-material/Place";
import FlagIcon from "@mui/icons-material/Flag";
import ListIcon from "@mui/icons-material/List";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TodoEditDialog } from "./TodoEditDialog";
import { TodoDeleteDialog } from "./TodoDeleteDialog";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const styleAlignItems: CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

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
  const [showButtons, setShowButtons] = useState<Boolean[]>([] as Boolean[]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editItem, setEditItem] = useState<Todo | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [order, setOrder] = useState("id");

  const handleFetchTodoItem = () => {
    fetch(`http://127.0.0.1:8000/api/todos/?ordering=${order}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoItems(result);
        setShowButtons(Array(result.length).fill(false));
      })
      .catch((error) => console.log("error", error));
  };

  const handleHover = (isHover: boolean, index: number) => {
    let curShowButtons = showButtons.slice();
    curShowButtons[index] = isHover;
    setShowButtons(curShowButtons);
  };

  const handleOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrder(event.target.value);
    handleFetchTodoItem();
  };

  const dateCompareWithNow = (due: string): string => {
    const dateDue = new Date(due);
    const dateNow = new Date();
    console.log(dateDue, dateNow);

    if (dateDue.getFullYear() < dateNow.getFullYear()) {
      return "Over Due";
    } else if (dateDue.getFullYear() > dateNow.getFullYear()) {
      return "Not Due";
    } else {
      if (dateDue.getDate() === dateNow.getDate()) {
        return "On Due";
      } else if (dateDue.getDate() < dateNow.getDate()) {
        return "Over Due";
      } else {
        return "Not Due";
      }
    }
  };

  const accordionBorder = (due: string): CSSProperties => {
    switch (dateCompareWithNow(due)) {
      case "On Due":
        return {
          backgroundColor: "#fff4e5",
        };
      case "Over Due":
        return {
          backgroundColor: "#fdeded",
        };
      default:
        return {};
    }
  };

  const dueStyle = (due: string): CSSProperties => {
    switch (dateCompareWithNow(due)) {
      case "On Due":
        return {
          color: "#ed6c02",
        };
      case "Over Due":
        return {
          color: "#d32f2f",
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    handleFetchTodoItem();
  }, [editItem, deleteItemId, order]);

  return (
    <>
      <Container maxWidth="md">
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
          sx={{ marginBottom: "5px" }}
        >
          {sortBy.map((o) => (
            <MenuItem value={o.value}>{o.text}</MenuItem>
          ))}
        </TextField>
        {todoItems.map((todo, index) => (
          <div
            key={index}
            onMouseEnter={() => handleHover(true, index)}
            onMouseLeave={() => handleHover(false, index)}
          >
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <Accordion
                style={accordionBorder(todo.due)}
                sx={{
                  flex: "1",
                  marginRight: "10px",
                  marginBottom: "5px !important",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>{todo.title}</div>
                    <div style={dueStyle(todo.due)}>Due Date: {todo.due}</div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div>{todo.content}</div>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={styleAlignItems}>
                        <PlaceIcon sx={{ marginRight: "10px" }} /> {todo.place}
                      </div>
                      <div style={styleAlignItems}>
                        <FlagIcon sx={{ marginRight: "10px" }} /> {todo.flag}
                      </div>
                      <div style={styleAlignItems}>
                        <ListIcon sx={{ marginRight: "10px" }} /> {todo.priority}
                      </div>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              {showButtons[index] ? (
                <>
                  <Tooltip title="Edit" placement="top" arrow>
                    <IconButton onClick={() => setEditItem(todo)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top" arrow>
                    <IconButton onClick={() => setDeleteItemId(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <></>
              )}
            </Typography>
          </div>
        ))}
        <Button
          variant="outlined"
          onClick={() => setShowAddDialog(true)}
          sx={{ marginTop: "10px" }}
        >
          新增
        </Button>
      </Container>
      {showAddDialog ? (
        <>
          <TodoAddDialog
            close={() => setShowAddDialog(false)}
            refresh={handleFetchTodoItem}
          />
        </>
      ) : (
        <></>
      )}
      {editItem ? (
        <>
          <TodoEditDialog
            editTodoItem={editItem}
            close={() => setEditItem(null)}
            refresh={handleFetchTodoItem}
          />
        </>
      ) : (
        <></>
      )}
      {deleteItemId ? (
        <>
          <TodoDeleteDialog
            itemId={deleteItemId}
            close={() => setDeleteItemId(null)}
            refresh={handleFetchTodoItem}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
