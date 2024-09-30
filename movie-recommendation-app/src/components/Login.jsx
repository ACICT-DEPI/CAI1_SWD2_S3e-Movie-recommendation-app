
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../config/firebaseConfig";


const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const userDocRef = doc(db, "users", username);
			const userDoc = await getDoc(userDocRef);

			if (!userDoc.exists()) throw new Error();
			console.log(userDoc.data().password);

			if (password == userDoc.data().password) {
				Swal.fire({
					icon: "success",
					title: "Welcome!",
					text: "You are successfully logged in.",
				});
			}
		} catch {
			setErrorMessage("Wrong username or password");
		}
	};

	return (
		<div
			className="h-screen bg-cover bg-brightness-150  bg-center flex flex-col justify-center items-center p-4 sm:p-8"
			style={{ backgroundImage: 'url("/Welcome-screen.jpeg")' }}
		>
			<h1 className="text-white text-3xl sm:text-4xl font-bold mb-6 text-center">
				Login
			</h1>
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
			>
				{errorMessage && (
					<p className="text-red-500 mb-4 text-center">{errorMessage}</p>
				)}
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Username
					</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
						placeholder="Enter your username"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
						placeholder="Enter your password"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300"
				>
					Log in
				</button>

				<div className="text-center w-full mt-5">
					<h3 className="text-black/60 text-sm">
						Don't have account yet?
						<Link
							to="/signup"
							className="text-black underline underline-offset-1"
						>
							{" "}
							Signup
						</Link>
					</h3>
				</div>
			</form>
		</div>
	);
};

export default Login;
