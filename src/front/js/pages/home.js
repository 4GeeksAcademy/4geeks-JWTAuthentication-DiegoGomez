<<<<<<< HEAD
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
=======
// Home.js
>>>>>>> 38adc73d17cd1437e82c3fbc8e1353c474f2577d

import React from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
					Read documentation
				</a>
			</p>
		</div>
	);
=======
const Home = () => {
  return (
    <div className="text-center mt-5 text-white">
      <h1 className="display-5">Authentication JWT Diego Gomez</h1>
      <div className="d-flex justify-content-center mt-3">
        <Link to="/signup" className="text-decoration-none">
          <div className="card m-2" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Signup</h5>
            </div>
          </div>
        </Link>
        <Link to="/login" className="text-decoration-none">
          <div className="card m-2" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Login</h5>
            </div>
          </div>
        </Link>
        <Link to="/private" className="text-decoration-none">
          <div className="card m-2" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Private</h5>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
>>>>>>> 38adc73d17cd1437e82c3fbc8e1353c474f2577d
};

export default Home;
