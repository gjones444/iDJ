import React, { Component } from 'react';
var Link = require("react-router-dom").Link;
import BGVideo from './BG-Video';
import Header from './Header';
import Logout from './Logout';
import Home from './Home';

export default class Log_in extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }
    logInForm(e){
        e.preventDefault()
      var signInUser = {
        username: this.refs.username.value,
        password: this.refs.password.value
      }
        fetch('/api/sign-in', {
            method: 'post',
            body: JSON.stringify(signInUser),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'same-origin'
        }).then((response) => {
            if(response.status == 401){
                alert("Login Failed for Username and/or Password")
            } else {
                this.props.history.push("/home")
            }
        });
    }


    render() {
      return (
        <div className="container">
        <BGVideo/>
        <div className="row" id="Log-in-div">
            <div className="col s6 offset-s3 z-depth-1" id="">
            <a href="#"><img className="brand-logo-login center" src="https://image.ibb.co/bydmDS/logo.png" alt="Logo"/></a>
              <h4 id="title" className="text-center">Welcome to iDJ</h4>
              <p id="title">Login Below</p>
              <form id="log-in-form" onSubmit={this.logInForm.bind(this)}>

              <div className="input-field" id="username">
                <label>Username</label>
                <input className="text-center" type="text" ref="username"/>
            </div>
            <div className="input-field" id="password">
                <label>Password</label>
                <input className="text-center" type="password" ref="password"/><br></br>
          </div>
          <p>
              <input type="checkbox" id="remember"/>
              <label htmlfor="remember" id="checkbox" >Remember me</label>
          </p>
          <input className="waves-effect waves-light btn orange" type="submit" value="Log In" id="Loginbtn" />
          <span><a href="/signup" className="waves-effect waves-light btn green" id="Registerbtn">Register</a></span>
          </form>
          </div>
        </div>

      </div>

      );
    }
};
