// This is the non-babel way to import
// var React = require("react");

// This is the babel way
import React, {Component} from 'react';
import SC from 'soundcloud';
import ReactPlayer from 'react-player'
//fetch does not work for api calls in react
//axios does
//https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5
import axios from 'axios';
import Home from './Home';


export default class Playlist extends Component {
  constructor(props){
    super(props);
    this.state = {
      playlist: [],
      id: 'id',
      playerOn: false,
      currentTrackID: undefined,
      playedOnce: 0
    }
  }

  initSC(){
      SC.initialize({
        client_id: 'ebe2d1362a92fc057ac484fcfb265049'
      });
    }

    getSongById(id){
  var id = this.value;
  var promise = new Promise(function(resolve, reject){
  SC.get('/tracks/' + id).then(function(response) {
      resolve(response);
    });
  });
  return promise;
}

  render(){

    return(
      <div className="container">
        <div className="row">
          <div className="col s12 board" id="table-style">
            <table id="simple-board">
               <tbody>
               </tbody>
             </table>
          </div>
        </div>
      </div>
    )
  }
}
