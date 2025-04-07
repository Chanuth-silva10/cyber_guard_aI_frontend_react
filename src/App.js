import { Flex, Spinner } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { NavBar } from "./components/Navbar/NavBar";
import { TodoDetail } from "./components/Todo/TodoDetail";
import { TodoList } from "./components/Todo/TodoList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<NavBar />}>
          <Route index element={<TodoList />} />
          <Route path=":todoId" element={<TodoDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
