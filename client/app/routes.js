import React from "react";
//imported the react-router
/*
	No more backend routes to connect to your front end files
	All front end routes are now done strictly on the front end, through react
*/
import { Switch, Route } from "react-router-dom";


import Home from "./components/Home";
import Playlist from "./components/Playlist";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";

/*
	this is where your routes are setup
	they are imported into the app.js file
  <Route path="/login" component={Login} />
  <Route exact path="/" component={Home} />

*/
export default (
  	<Switch>
    	<Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/logout" component={Logout} />
    </Switch>
);
