import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";
import FlagIcon from "@mui/icons-material/Flag";
import ListIcon from "@mui/icons-material/List";
import { CSSProperties, useEffect, useState } from "react";
import { Todo } from "./todo.types";
import { TodoDeleteDialog } from "./TodoDeleteDialog";
import { TodoEditDialog } from "./TodoEditDialog";
import { TodoActionButtons } from "./TodoActionButtons";

type DueStatus = "Over Due" | "On Due" | "Not Due";

const itemStyle = {
  "Over Due": {
    bgc: {
      backgroundColor: "#fdeded",
    },
    color: {
      color: "#d32f2f",
    },
  },
  "On Due": {
    bgc: {
      backgroundColor: "#fff4e5",
    },
    color: {
      color: "#ed6c02",
    },
  },
  "Not Due": {
    bgc: {},
    color: {},
  },
};

const styleAlignItems: CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

type TodoItemProps = {
  item: Todo;
  refresh: () => void;
};

export const TodoItem = (props: TodoItemProps) => {
  const [isHover, setIsHover] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [status, setStatus] = useState<DueStatus>('Not Due');

  useEffect(() => {
    setStatus(() => {
      const dateDue = new Date(props.item.due);
      const dateNow = new Date();

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
    });
  }, [showEditDialog, showDeleteDialog, status]);

  return (
    <>
      <Typography
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        display="flex"
        alignItems="center"
      >
        <Accordion
          style={itemStyle[status].bgc}
          sx={{
            flex: "1",
            marginBottom: "5px !important",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              display="flex"
              justifyContent="space-between"
              width="100%"
            >
              <div>{props.item.title}</div>
              <div style={itemStyle[status].color}>
                Due Date: {props.item.due}
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div>{props.item.content}</div>
              </Grid>
              <Grid item xs={6}>
                <div style={styleAlignItems}>
                  <PlaceIcon sx={{ marginRight: "10px" }} /> {props.item.place}
                </div>
                <div style={styleAlignItems}>
                  <FlagIcon sx={{ marginRight: "10px" }} /> {props.item.flag}
                </div>
                <div style={styleAlignItems}>
                  <ListIcon sx={{ marginRight: "10px" }} />{" "}
                  {props.item.priority}
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <TodoActionButtons
          show={isHover}
          onEditClick={() => setShowEditDialog(true)}
          onDeleteClick={() => setShowDeleteDialog(true)}
        />
      </Typography>

      <TodoEditDialog
        editTodoItem={props.item}
        show={showEditDialog}
        close={() => setShowEditDialog(false)}
        refresh={props.refresh}
      />
      <TodoDeleteDialog
        itemId={props.item.id}
        show={showDeleteDialog}
        close={() => setShowDeleteDialog(false)}
        refresh={props.refresh}
      />
    </>
  );
};
