import React, {Component} from 'react';

export default class Nav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    return (
      <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">Logo</a>
      <ul id="nav" className="right">
      <li><a href="/">Login</a></li>
      <li><a href="/signup">Signup</a></li>
      </ul>
    </div>
  </nav>
    );
  }
}
