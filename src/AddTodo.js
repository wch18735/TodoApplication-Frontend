import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

const AddTodo = (props) => {
    // 사용자 입력 저장 Object
    const [item, setItem] = useState({title: ""});
    const addItem = props.addItem;

    // onButtonClick
    const onButtonClick = () => {
        if(item.title.length === 0) {
            alert("할 일을 추가해주세요.");
        }else{
            addItem(item);
            setItem({title: ""});
        }
    }

    // onInputChange
    const onInputChange = (e) => {
        setItem({title: e.target.value});
    }

    // enterKeyEventHandler
    const enterKeyEventHandler = (e) => {
        if(e.key === 'Enter') {
            onButtonClick();
        }
    };

    return (
        <Grid container style={{marginTop: 20}}>
            <Grid xs={11} md={11} item style={{paddingRight: 16}}>
                <TextField 
                    placeholder="Add Todo here" 
                    fullWidth 
                    onChange={onInputChange}
                    onKeyPress={enterKeyEventHandler} 
                    value={item.title} />
            </Grid>
            <Grid xs={1} md={1} item>
                <Button 
                    fullWidth
                    onClick={onButtonClick}
                    style={{height: '100%'}} 
                    color="secondary" 
                    variant="outlined">+</Button>
            </Grid>
        </Grid>
    );
}

export default AddTodo;