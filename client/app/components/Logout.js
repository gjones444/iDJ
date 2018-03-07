import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

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
            browserHistory.push('/login');
          }
        });
    }
    render() {
      return (
      <ul className="right">
        <Link onClick={this.signoutUser.bind(this)}>Logout</Link>
      </ul>
      );
    }
};
