import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';

class Sign_up extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }

  registration(e){
    e.preventDefault();
    if(this.refs.confirmPassword.value === this.refs.password.value){
      var newUser = {
        username: this.refs.username.value,
        password: this.refs.password.value
      }
      fetch('/api/sign-up', {
          method: 'post',
          body: JSON.stringify(newUser),
          headers: {
              'content-type': 'application/json',
              'accept': 'application/json'
          },
          credentials: 'same-origin'
      }).then((response) => response.json())
      .then((results) => {
        this.props.history.push("/");
        console.log(results)
      });
    } else {
      alert("Passwords do not match")
    }
  }
  render() {
    return (
      <div class="container">
      <div class="row">
          <div class="col s6 offset-s3 z-depth-1" id="Sign_up_div">
          <a href="#"><img className="brand-logo-login center" src="https://image.ibb.co/bydmDS/logo.png" alt="Logo"/></a>
            <h4 id="title" className="text-center">Register for iDJ</h4>
            <p id="title">Enter your new credentials</p>            
            <form id="sign-in-form" onSubmit={this.registration.bind(this)}>

            <div class="input-field" id="username">
              <input  type="text" class="validate" ref="username"/>
              <label for="username">Username</label>
          </div>
          <div class="input-field" id="password">
            <input  type="password" ref="password" class="validate"/>
            <label for="password">Password</label>
        </div>
        <div class="input-field" id="confirmPassword">
          <input  type="password" ref="confirmPassword" class="validate"/>
          <label for="password">Confirm Password</label>
      </div>
        <p>
            <input type="checkbox" id="remember"/>
            <label for="remember" id="checkbox" >Remember me</label>
        </p>
        <input className="waves-effect waves-light btn orange" type="submit" value="Register" id="Registerbtn"/>
        <span><a href="/" className="waves-effect waves-light btn green">Sign In</a></span>
        </form>

        </div>
      </div>

    </div>
      
      
       
    );
  }
};
export default withRouter(Sign_up)
