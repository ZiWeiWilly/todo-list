import { CSSProperties, useEffect, useState } from "react"
import Container from '@mui/material/Container';

import { Todo } from "./todo.types"
import { TodoAddDialog } from "./TodoAddDialog";
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
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh';
import { TodoEditDialog } from "./TodoEditDialog";
import { TodoDeleteDialog } from "./TodoDeleteDialog";


export const TodoList = () => {
    const styleAlignItems: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    }

    const [todoItems, setTodoItems] = useState<Todo[]>([] as Todo[])
    const [showButtons, setShowButtons] = useState<Boolean[]>([] as Boolean[])
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [editItem, setEditItem] = useState<Todo | null>(null)
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null)

    const handleFetchTodoItem = () => {
        fetch('http://127.0.0.1:8000/api/todos/', {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            redirect: 'follow'
        })
        .then(response => response.json())
        .then((result) => {
            setTodoItems(result)
            setShowButtons(Array(result.length).fill(false))
        })
        .catch(error => console.log('error', error))
    }

    const handleHover = (isHover: boolean, index: number) => {
        let curShowButtons = showButtons.slice()
        curShowButtons[index] = isHover
        setShowButtons(curShowButtons)
    }

    useEffect(() => {
        handleFetchTodoItem()
    },[])

    return (
        <>
            <Container maxWidth="md">
                <h3>
                    待辦事項 
                    <IconButton onClick={handleFetchTodoItem}>
                        <RefreshIcon />
                    </IconButton>
                </h3>
                {todoItems.map((todo, index) => (
                    <div 
                        key={index} 
                        onMouseEnter={() => handleHover(true, index)} 
                        onMouseLeave={() => handleHover(false, index)}
                    >
                        <Typography sx={{display: 'flex', alignItems: 'center'}}>
                            <Accordion sx={{flex: '1', marginRight: '10px', marginBottom: '1px'}}>
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
                            {showButtons[index]
                            ? 
                                <>
                                    <IconButton aria-label="edit" onClick={() => setEditItem(todo)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => setDeleteItemId(todo.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            :
                                <></>
                            }
                        </Typography>
                    </div>
                ))}
                <Button 
                    variant="outlined" 
                    onClick={() => setShowAddDialog(true)}
                    sx={{marginTop: '10px'}}
                >
                    新增
                </Button>
            </Container>
            {showAddDialog
                ?
                    <>
                        <TodoAddDialog 
                            close={() => setShowAddDialog(false)} 
                            refresh={handleFetchTodoItem}
                        />
                    </>
                :
                    <></>
            }
            {editItem
                ?
                    <>
                        <TodoEditDialog 
                            editTodoItem={editItem} 
                            close={() => setEditItem(null)}  
                            refresh={handleFetchTodoItem}
                        />
                    </>
                :
                    <></>
            }
            {deleteItemId
                ?
                    <>
                        <TodoDeleteDialog 
                            itemId={deleteItemId} 
                            close={() => setDeleteItemId(null)} 
                            refresh={handleFetchTodoItem}
                        />
                    </>
                :
                    <></>
            }
        </>
    )
}