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
       <div className="text-center">
       <Header/>
         <h4>Enter Your New Username and Password Below</h4>
        <div className="center-block" id="Sign_up_div">
          <form id="sign-in-form" onSubmit={this.registration.bind(this)}>
            <label>Username</label><br></br>
            <input className="text-center" type="text" ref="username"/><br></br>
            <label>Password</label><br></br>
            <input className="text-center" type="password" ref="password"/><br></br>
            <label>Confirm Password</label><br></br>
            <input className="text-center" type="password" ref="confirmPassword"/><br></br>
            <input id="register-btn"className="btn btn-warning" type="submit"/>
          </form>
      </div>
        </div>
    );
  }
};
export default withRouter(Sign_up)
