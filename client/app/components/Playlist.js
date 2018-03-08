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
    playlist_db: [],
    voteIndex: 0,
    count: 0
    }
  }

componentWillMount(){
  {
    axios({
      method: 'get',
      url: '/api/playlist/'
    }).then((response) => {
      console.log(response.data.playlist.rows)
          this.setState({
            playlist_db: response.data.playlist.rows
          })
      })
  }
}


  upVote(){
    this.setState({
      voteIndex: this.state.voteIndex + 1
    })
  }

  downVote(){
    axios.put('/api/vote-up-down/' + 30,{
        votectn: this.state.voteIndex - 1
      })
  }


  goPlay(){
       SC.stream(('/tracks/' + this.state.playlist_db[0].song_id)).then(function(player){
         player.play();
       });
  }

  render(){
    const {songList, index, voteIndex, playlist_db} = this.state;
    const showSongs = () => {
        if(playlist_db && playlist_db.length > 0){
          return (
              <div>
              <table>
              <tbody>
                  <tr>
                    <th>Index</th>
                    <th>Song Title</th>
                    <th>Vote Up</th>
                    <th>Vote Down</th>
                    <th>Play</th>
                    <th>Vote Count</th>
                  </tr>
                  <tr>
                    <td>{playlist_db[0].id}</td>
                    <td>{playlist_db[0].song}</td>
                    <td><button onClick={this.upVote.bind(this)}>Up</button></td>
                    <td><button data-id="1" onClick={this.downVote.bind(this)}>Down</button></td>
                    <td><button onClick={this.goPlay.bind(this)}>Play</button></td>
                    <td>Score: {n}</td>
                  </tr>
                  </tbody>
                </table>
            </div>
          )
        }
    }

    return(
      <div className="Table-headers">
      <thead>
      <tr>
        <th>Index</th>
        <th>Song Title</th>
        <th>Vote Up</th>
        <th>Vote Down</th>
        <th>Play</th>
        <th>Vote Count</th>
      </tr>
      </thead>
      {
          playlist_db.map((item, index) => {
              return (
                <div>
                <table key={index}>
                <tbody>
                    <tr>
                      <td>{playlist_db[index].id}</td>
                      <td>{playlist_db[index].song}</td>
                      <td><button onClick={this.upVote.bind(this)}>Up</button></td>
                      <td><button onClick={this.downVote.bind(this)}>Down</button></td>
                      <td><button onClick={this.goPlay.bind(this)}>Play</button></td>
                      <td>Score: {voteIndex}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              )
          })
        }
      </div>
    )
  }
}
