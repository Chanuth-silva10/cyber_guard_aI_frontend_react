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
import { TypeDetail } from "./components/Type/TypeDetail";
import { TypeList } from "./components/Type/TypeList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<NavBar />}>
          <Route index element={<TypeList />} />
          <Route path=":Id" element={<TypeDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
