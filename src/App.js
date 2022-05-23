import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Authenticate from "./components/Authenticate";

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
		</Routes>
    </BrowserRouter>
    // <div className="App">
		// <Login />
    // </div>
  );
}

export default App;
