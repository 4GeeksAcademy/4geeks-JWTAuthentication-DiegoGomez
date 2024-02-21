import React, { useContext, useState } from "react";
//import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { useHistory } from "react-router-dom";

export const Signup = () => {
	//const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	let history = useHistory();

	async function signUp(event) {
		event.preventDefault();

		if (password !== confirmPass) {
			alert("Las constraseñas no coinciden");
			return;
		}
		console.log("hasta qui llega");
		const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
				is_active: true
			})
		});
		console.log(response);
		const responseJson = await response.json();
		history.push("/login");
		return responseJson;
	}

	return (
		<div className="container">
			<h1>SIGN UP</h1>
			<form onSubmit={signUp}>
				<div className="form-group">
					<input
						type="email"
						className="form-control"
						placeholder="email"
						onChange={event => setEmail(event.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="password"
						onChange={event => setPassword(event.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="password confirmation"
						onChange={event => setConfirmPass(event.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Save
				</button>
			</form>
		</div>
	);
};
