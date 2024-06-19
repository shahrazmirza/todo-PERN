import InputTodo from "./components/InputTodo"
import ListTodos from "./components/ListTodos"

export default function Home() {
  return (
    <div className="container">
      <InputTodo />
      <ListTodos />
    </div>
  );
}
