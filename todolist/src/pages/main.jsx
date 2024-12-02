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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;
const Edit = styled.div`
  display: flex;
  flex-direction: column;
`;
const EditableInput = styled.input`
  width: 200px;
  height: 20px;
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
const Checkbox = styled.input`
  margin-right: 8px;
`;
const Btn = styled.button`
  width: 70px;
  height: 25px;
  margin: 4px;
  text-align: center;
`;
function Main() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("http://localhost:3000/todo");
        setTodos(response.data);
      } catch (e) {
        console.error("Error fetching todos:", e);
      }
    }
    fetchTodos();
  }, []);

  const handleCreate = async () => {
    try {
      const newTodo = {
        title,
        content,
        checked: false,
      };
      const response = await axios.post("http://localhost:3000/todo", newTodo);
      setTodos([...todos, response.data]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.error("Error creating todo:", e);
    }
  };

  const handleToggleCheck = async (id, currentChecked) => {
    try {
      await axios.patch(`http://localhost:3000/todo/${id}`, {
        checked: !currentChecked,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, checked: !currentChecked } : todo
        )
      );
    } catch (e) {
      console.error("Error toggling check:", e);
    }
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete ID:", id); // 삭제할 ID를 출력
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id)); // 상태 업데이트
      console.log("Delete successful");
    } catch (e) {
      console.error("Error deleting todo:", e.response ? e.response.data : e);
    }
  };

  const handleEditToggle = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  const handleEditSave = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/todo/${id}`, {
        title: editTitle,
        content: editContent,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, title: editTitle, content: editContent }
            : todo
        )
      );
      setEditId(null);
    } catch (e) {
      console.error("Error saving edits:", e);
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
        />
        <ContentInput
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleCreate}>todo 생성하기</Button>
      </TodoMaking>
      <TodoContainer>
        {todos.map((todo) =>
          editId === todo.id ? (
            <TodoCard key={todo.id}>
              <Edit>
                <EditableInput
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <EditableInput
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </Edit>
              <div>
                <Btn onClick={() => handleEditSave(todo.id)}>수정완료</Btn>
              </div>
            </TodoCard>
          ) : (
            <TodoCard key={todo.id}>
              <Checkbox
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleToggleCheck(todo.id, todo.checked)}
              />
              <div>
                <TodoTitle>{todo.title}</TodoTitle>
                <TodoContent>{todo.content}</TodoContent>
              </div>

              <div>
                <Btn onClick={() => handleEditToggle(todo)}>수정</Btn>
                <Btn onClick={() => handleDelete(todo.id)}>삭제</Btn>
              </div>
            </TodoCard>
          )
        )}
      </TodoContainer>
    </Wrapper>
  );
}

export default Main;
