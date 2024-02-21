import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { useHistory } from "react-router-dom";

export const Protected = () => {
	let history = useHistory();
	const { store, actions } = useContext(Context);
	const [data, setData] = useState(" ");

	const protectedData = async () => {
		// retrieve token form localStorage
		const token = localStorage.getItem("jwt-token");
		const response = await fetch(process.env.BACKEND_URL + "/api/protected", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		if (!response.ok) throw Error("There was a problem in the login request");
		const responseJson = await response.json();
		setData(responseJson);
	};

	useEffect(() => {
		if (store.user_token === null) history.push("/login");
		else protectedData();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info" />
			<h1>HI! YOUR PROTECTED DATA HERE</h1>
		</div>
	);
};
