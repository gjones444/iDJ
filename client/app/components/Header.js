import React, {Component} from 'react';

export default class Nav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: this.props.user
    };
  }
  render() {
    console.log(this.state.user)
    return (
      <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo"><img style={{height: 75, width: "auto"}} src="https://image.ibb.co/bydmDS/logo.png" alt="Logo"/></a>
      <ul id="nav" className="right">
      <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  </nav>
    );
  }
}
