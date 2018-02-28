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
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Logo</a>
      <ul id="nav" class="right">
        <li><a href="#">Login</a></li>
        <li><a href="/signup">Signup</a></li>
      </ul>
    </div>
  </nav>
    );
  }
}
