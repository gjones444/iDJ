import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Playlist from "./components/Playlist";
import Signup from "./components/Signup";
import Login from "./components/Login";

/*
	this is where your routes are setup
	they are imported into the app.js file
*/
export default (
  	<Switch>
    	<Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </Switch>
);
