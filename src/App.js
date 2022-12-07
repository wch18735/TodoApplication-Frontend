import './App.css';
import Todo from './Todo'
import React, {useEffect, useState} from "react";
import { Container, List, Paper, Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /*** item 조회 (in useEffect) ***/
  useEffect(() => {
    // 첫 렌더링 후 배열 안의 오브젝트 값이 변화할 때마다 콜백 함수 사용
    call("/todo", "GET", null)
    .then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  /*** item 추가 ***/
  const addItem = (item) => {
    call("/todo", "POST", item)
    .then((response) => setItems(response.data));
  }

  /*** item 삭제 ***/
  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
    .then((response) => setItems(response.data));
  }

  /*** item 수정 ***/
  const editItem = (item) => {
    call("/todo", "PUT", item)
    .then((response) => setItems(response.data));
  }

  let todoItems = items.length > 0 && (
    <Paper style={{margin: 16}}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem}/>
        ))}
      </List>
    </Paper>
  );

  /*** navigationBar 추가 ***/
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography varient="h6">To do List</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised="true" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  /*** Loading ***/
  let loadingPage = <h1> 로딩중... </h1>
  let content = loadingPage;

  /*** Loaded ***/
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth = "md">
        <AddTodo addItem={addItem}/>
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  )

  if(!loading){
    /* 로딩중이 아니면 todoListPage 선택 */
    content = todoListPage;
  }

  return <div className='App'>{content}</div>
}

export default App;
