import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;
const TodoMaking = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid lightgray;
  margin: 4px;
`;
const ContentInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid lightgray;
  margin: 4px;
`;
const Button = styled.button`
  width: 310px;
  height: 25px;
  border-radius: 4px;
  border: 1px solid lightgray;
  margin: 4px;
`;
const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const TodoCard = styled.div`
  width: 280px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const TodoTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const TodoContent = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
`;

const Btn = styled.button`
  width: 40px;
  height: 15px;
`;
function Main() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function Todos() {
      try {
        const response = await axios.get("http://localhost:3000/todo");
        setTodos(response.data);
      } catch (e) {
        console.error("errors: ", e);
      }
    }
    Todos();
  }, []);

  const handleCreate = async () => {
    try {
      const newTodo = {
        title: title,
        content: content,
        checked: false,
      };
      const response = await axios.post("http://localhost:3000/todo", newTodo);
      setTodos((prev) => [...prev, response.data]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.error("error todo: ", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/todo/${id}");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error("error delete: ", e);
    }
  };
  return (
    <Wrapper>
      <Title>Todo List</Title>
      <TodoMaking>
        <TitleInput
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TitleInput>
        <ContentInput
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></ContentInput>
        <Button onClick={handleCreate}>todo 생성하기</Button>
      </TodoMaking>
      <TodoContainer>
        {todos.map((todo, index) => (
          <TodoCard key={index}>
            <TodoTitle>{todo.title}</TodoTitle>
            <TodoContent>{todo.content}</TodoContent>
            <div>
              <Btn>수정</Btn>
              <Btn danger onClick={() => handleDelete(todo.id)}>
                삭제
              </Btn>
            </div>
          </TodoCard>
        ))}
      </TodoContainer>
    </Wrapper>
  );
}

export default Main;
