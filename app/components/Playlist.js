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

showPlaylist(){
  axios.get('/api/playlist/').then(results => {
    console.log(results)
  })
}


  // $.ajax({
	// 	method: 'GET',
	// 	url: '/api/playlist'
	// }).then(function(x){
	// 	console.log(x)
		// var newRow, numTd, artistTd, titleTd;
		// for(var i = 0; i < results.songs.length; i++){
		// 	newRow = $('<tr class="song-row" data-song_name=' + results.songs[i].song_name.split(" ").join("+").toLowerCase() +'>')
		// 	numTd = $('<td>');
		// 	artistTd = $('<td>');
		// 	titleTd = $('<td>');
    //
		// 	numTd.text(i + 1);
		// 	artistTd.text(results.songs[i].song_artist);
		// 	titleTd.text(results.songs[i].song_name);
		// 	newRow.append(numTd).append(artistTd).append(titleTd);
		// 	$('#tbody').append(newRow)
		// }
	// });


  render(){

    return(
      <div className="container">
        <a onClick={this.addToPlaylist.bind(this)} className="waves-effect waves-light btn">Test</a>
      </div>
    )
  }
}
