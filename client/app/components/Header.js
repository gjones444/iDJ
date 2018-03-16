import React, {Component} from 'react';
import logo from '../../public/images/logo.png';


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
      <nav className="nav-wrapper">
    <div>
      <a href="#" className="brand-logo"><img style={{height: 50, width: "auto"}} src={logo} alt="Logo"/></a>
      <ul id="nav" className="right">
      <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  </nav>
    );
  }
}
