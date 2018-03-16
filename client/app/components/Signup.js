import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import BGVideo from './BG-Video';
import logo from '../../public/images/logo.png';


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
    console.log(this.refs.password.value)
  }

  render() {
    return (
      <div className="container">
      <BGVideo/>
        <div className="row" id="Sign_up_div">
          <div className="col s6 offset-s3 z-depth-5">
            <a href="#"><img className="brand-logo-login center" src={logo} alt="Logo"/></a>
            <h4 id="title" className="text-center">Register for iDJ</h4>
            <p id="title">Enter your new credentials</p>
            <form id="sign-in-form" onSubmit={this.registration.bind(this)}>

              <div className="input-field" id="username">
                <input type="text" className="validate" ref="username" />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field" id="password">
                <input type="password" ref="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field" id="confirmPassword">
                <input type="password" ref="confirmPassword" className="validate" />
                <label htmlFor="password">Confirm Password</label>
              </div>
              <p>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" id="checkbox">Remember me</label>
              </p>
              <input className="waves-effect waves-light btn orange" type="submit" value="Register" id="Signupbtn" />
              <span><a href="/" className="waves-effect waves-light btn green" id="Signinbtn">Sign In</a></span>
            </form>
          </div>
        </div>
      </div>



    );
  }
};
export default withRouter(Sign_up)
