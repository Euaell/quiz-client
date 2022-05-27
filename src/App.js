import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import Authenticate from "./components/Authenticate";
import {EmployeeInputWithIcon, Employees} from "./components/Employees";
import {SignIn, SignUp} from "./components/Nerd/SignUp";
import LandingPage from "./components/Nerd/LandingPage";
import DisMachines from "./components/Nerd/DisMachines";
import AdminAuth from "./components/Nerd/AdminAuth";
import {Add} from "./components/Nerd/Add";
import {Edit} from "./components/Nerd/Edit";
import Order from "./components/Nerd/Order";

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<LandingPage />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<SignIn />} />
				<Route element={<Authenticate />}>
					<Route path="/items" element={<DisMachines />} />
					<Route path="/" element={<AdminAuth />} >
						<Route path="/add" element={<Add />} />
						<Route path="/edit" element={<Edit />} />
					</Route>
					<Route path="/order" element={<Order />} />
				</Route>
			</Route>
			<Route path="/employee" element={<Employees />} />
			<Route path="/newEmployee" element={<EmployeeInputWithIcon />} />
		</Routes>
    </BrowserRouter>
  );
}

export default App;
