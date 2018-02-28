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

export default class Playlist extends Component {
  constructor(props){
    super(props);
    this.state = {size: 3}
  }

  render(){
    let rows = [];
    SC.get('/tracks/',{
			q: this.props.searchResult
		}).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i])
      }
    })

    return(
      <div className="container">
        <div className="row">
          <div className="col s12 board" id="table-style">
            <table id="simple-board">
               <tbody>
                 {rows}
               </tbody>
             </table>
             <ReactPlayer url='https://soundcloud.com/miami-nights-1984/accelerated' playing />
          </div>
        </div>
      </div>
    )
  }
}
