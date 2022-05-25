import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Authenticate from "./components/Authenticate";
import {EmployeeInputWithIcon, Employees} from "./components/Employees";

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route element={<Authenticate />}>
				<Route path="/" element={<Layout />}>
					<Route path="/quiz" element={<Quiz />} />
					<Route path="/result" element={<Result />} />
				</Route>
			</Route>
			<Route path="/employee" element={<Employees />} />
			<Route path="/newEmployee" element={<EmployeeInputWithIcon />} />
		</Routes>
    </BrowserRouter>
    // <div className="App">
		// <Login />
    // </div>
  );
}

export default App;
