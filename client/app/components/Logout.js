import React, { Component } from 'react';
var Link = require("react-router-dom").Link;
import Login from './Login';


export default class Logout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    };
  }
  
  signoutUser(){
          fetch('/api/logout', {
              method: 'DELETE',
              credentials: 'same-origin'
          }).then((response) => {
            if(response.status == 204){
              this.props.history.push("/")
            }
          });
      }
    
    render() {
      return (
      <Login/>
      )
    }
};
