import { FormEvent, useState } from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import { Todo } from './todo.types';

const priorityOption = ['Low', 'Middle', 'High']

type TodoAdditionProps = {
    onTodoItemAdd: (item: Todo) => void
}

export const TodoAddition = (props: TodoAdditionProps) => {
    const [open, setOpen] = useState(false)

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [due, setDue] = useState('');
    const [place, setPlace] = useState('');
    const [flag, setFlag] = useState('');
    const [priority, setProprity] = useState<Todo['priority']>('Low');
    const [isCompleted, setIsCompleted] = useState(false);

    const resetAddition = () => {
        setTitle('')
        setContent('')
        setDue('')
        setPlace('')
        setFlag('')
        setProprity('Low')
    }

    const handleSubmit = (event: FormEvent) => {
        props.onTodoItemAdd({
            title: title,
            content: content,
            due: due,
            place: place,
            flag: flag,
            priority: priority,
            isCompleted: isCompleted,
        })
        event.preventDefault()
        resetAddition()
    }

    return (
        <Box component="form" onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <h4>新增代辦事項</h4>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="標題"
                        size='small'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="內容"
                        size='small'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="截止日"
                        size='small'
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
                        size='small'
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="標籤"
                        size='small'
                        value={flag}
                        onChange={(e) => setFlag(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="重要度"
                        size='small'
                        select
                        value={priority}
                        onChange={(e) => setProprity(e.target.value as Todo['priority'])}
                        defaultValue="Low"
                        fullWidth
                    >
                        {priorityOption.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Button type='submit' variant="outlined">
                            Add
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}