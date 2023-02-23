import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type TodoActionButtonsProps = {
  show: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

export const TodoActionButtons = (props: TodoActionButtonsProps) => {
  if (!props.show) {
    return null;
  }

  return (
    <div style={{ marginLeft: "10px" }}>
      <Tooltip title="Edit" placement="top" arrow>
        <IconButton>
          <EditIcon onClick={props.onEditClick} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" placement="top" arrow>
        <IconButton>
          <DeleteIcon onClick={props.onDeleteClick} />
        </IconButton>
      </Tooltip>
    </div>
  );
};
