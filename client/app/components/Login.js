import React, {Component} from 'react';
import SC from 'soundcloud';
import axios from 'axios';
import Playlist from './Playlist';

export default class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        songList: [],
      };
  }
}
