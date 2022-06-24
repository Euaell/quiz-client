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
import {Orders} from "./components/Nerd/Orders";
import Services, {AdminServices} from "./components/Nerd/Services";

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
					<Route path="/services" element={<Services />} />
					<Route path="/" element={<AdminAuth />} >
						<Route path="/add" element={<Add />} />
						<Route path="/viewOrders" element={<Orders />} />
						<Route path="/edit" element={<Edit />} />
						<Route path="/viewServices" element={<AdminServices />} />
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
