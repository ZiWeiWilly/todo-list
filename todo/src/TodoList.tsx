import React, { CSSProperties, useEffect, useState } from "react"
import Container from '@mui/material/Container';

import { Todo } from "./todo.types"
import { TodoAddition } from "./TodoAddition";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PlaceIcon from '@mui/icons-material/Place';
import FlagIcon from '@mui/icons-material/Flag';
import ListIcon from '@mui/icons-material/List';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const TodoList = () => {
    const styleAlignItems: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    }

    const [todoItems, setTodoItems] = useState<Todo[]>([] as Todo[])

    const handleCreateTodoItem = (item: Todo) => {
        let curItems = todoItems.slice()
        curItems.push(item) 
        setTodoItems(curItems)
    }

    const handleEditTodoItem = (item: Todo) => {
        
    }

    const handleDeleteTodoItem = (item: Todo) => {

    }

    return (
        <Container maxWidth="md">
            <TodoAddition onTodoItemAdd={handleCreateTodoItem}  />
            <hr />
            {todoItems.map((todo, index) => (
                <Typography key={index} sx={{display: 'flex', alignItems: 'center'}}>
                    <Accordion sx={{flex: '1', marginRight: '10px'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                <div>{todo.title}</div>
                                <div>{todo.due}</div>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <div>{todo.content}</div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={styleAlignItems}>
                                        <PlaceIcon sx={{marginRight: '10px'}} /> {todo.place}
                                    </div>
                                    <div style={styleAlignItems}>
                                        <FlagIcon sx={{marginRight: '10px'}} /> {todo.flag}
                                    </div>
                                    <div style={styleAlignItems}>
                                        <ListIcon sx={{marginRight: '10px'}} /> {todo.priority}
                                    </div>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <IconButton aria-label="edit" onClick={() => handleEditTodoItem(todo)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDeleteTodoItem(todo)}>
                        <DeleteIcon />
                    </IconButton>
                </Typography>
            ))}
        </Container>
    )
}