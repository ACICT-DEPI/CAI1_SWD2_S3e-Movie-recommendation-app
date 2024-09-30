import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login";
import Signup from "../Signup";
import Main from "../Main";

const Welcome = () => {
	return (
		<Routes>
			
		  <Route path="/" element={<Main />} />
		  <Route path="/login" element={<Login />} />
		  <Route path="/signup" element={<Signup />} />
		  
		</Routes>
	  );
};

export default Welcome;
