import React, { useState } from "react";
import { 
    ListItem, 
    ListItemText, 
    InputBase, 
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

const Todo = (props) => {
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);

    // delete handler
    const deleteItem = props.deleteItem;
    const deleteEventHandler = () => {
        deleteItem(item);
    }

    // modify handler
    const editItem = props.editItem;
    const editEventHandler = (e) => {
        setItem({...item, title: e.target.value});
    }

    const turnOnReadOnly = (e) => {
        if(e.key === "Enter" && readOnly === false) {
            setReadOnly(true);
            editItem(item); // 수정이 완료된 상태 한 번만 전송
        }
    }

    // ReadOnly handler
    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    // CheckBox handler
    const checkboxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem(item);
    }

    return (
        <ListItem>
            <Checkbox checked={item.done} onChange={checkboxEventHandler} />
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label": "naked",
                                  readOnly: readOnly}}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
                    <DeleteOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Todo;