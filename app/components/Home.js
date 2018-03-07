import React, {Component} from 'react';
import SC from 'soundcloud';
import axios from 'axios';
import Playlist from './Playlist';
import Header from './Header';
import TableExampleSimple from './Playlist'

export default class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        songList: [],
        index: 0,
        voteIndex: 0
      };
  }

  nextClick(){
    this.setState({
      index: this.state.index + 1
    })
  }
  prevClick(){
    this.setState({
      index: this.state.index - 1
    })
  }

  upVote(){
    this.setState({
      voteIndex: this.state.voteIndex + 1
    })
  }

  downVote(){
    this.setState({
      voteIndex: this.state.voteIndex - 1
    })
  }

  componentWillMount(){
    SC.initialize({
      client_id: 'ebe2d1362a92fc057ac484fcfb265049'
    });
  }

  searchSong(){
    let searchResult = this.refs.songSearch.value;
    SC.get('/tracks/',{
			q: searchResult
		}).then((results) => {
        this.setState({
          songList: results
        });
    })
  }

  addToPlaylist(){
    axios.post('/api/add-song/',{
        song: this.state.songList[this.state.index].title,
        song_id: this.state.songList[this.state.index].id,
        uri: this.state.songList[this.state.index].uri,
        artwork: this.state.songList[this.state.index].artwork_url,
        votes_count: this.state.songList[this.state.index].voteIndex
      }).then(function (response)
      {
      console.log("This works")
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  showPlaylist(){
    axios.get('/api/playlist/').then(results => {
      console.log(results.data.playlist.rows[0].song)
      return (
          <div>
          <table>
          <tbody>
              <tr>
                <th>Index</th>
                <th>Song Title</th>
                <th>Vote Up</th>
                <th>Vote Down</th>
                <th>Vote Count</th>
              </tr>
              <tr>
                <td>{index}</td>
                <td>{results.data.playlist.rows[0].song}</td>
                <td><button onClick={this.upVote.bind(this)}>Up</button></td>
                <td><button onClick={this.downVote.bind(this)}>Down</button></td>
                <td><button onClick={this.goPlay.bind(this)}>Play</button></td>
                <td>{voteIndex}</td>
              </tr>
              </tbody>
            </table>
        </div>
      )
    })
  }

    goPlay(){
         SC.stream('/tracks/' + this.state.songList[this.state.index].id).then(function(player){
           player.play();
         });
    }

  render() {
    const {songList, index, voteIndex} = this.state;
    const searchedSongs = () => {
      if(songList && songList.length > 0){
        return(
          <div>
          <span>
            <li><img src={songList[0].artwork_url}></img>   Title: {songList[0].title} <button onClick={this.addToPlaylist.bind(this)}>Add to playlist</button></li>
            <li><img src={songList[1].artwork_url}></img>   Title: {songList[1].title} <button onClick={this.showPlaylist.bind(this)}>Zzzzzzzzzzzz</button></li>
          </span>
          </div>
        )
      }
    }

    const showSongs = () => {
        if(songList && songList.length > 0){
          return (
              <div>
              <table>
              <tbody>
                  <tr>
                    <th>Index</th>
                    <th>Song Title</th>
                    <th>Vote Up</th>
                    <th>Vote Down</th>
                    <th>Vote Count</th>
                  </tr>
                  <tr>
                    <td>{index}</td>
                    <td>{songList[index].title}</td>
                    <td><button onClick={this.upVote.bind(this)}>Up</button></td>
                    <td><button onClick={this.downVote.bind(this)}>Down</button></td>
                    <td><button onClick={this.goPlay.bind(this)}>Play</button></td>
                    <td>{voteIndex}</td>
                  </tr>
                  </tbody>
                </table>
            </div>
          )
        }
    }

    const showPrevBtn = () => {
      if(index >= 1){
        return (
          <a onClick={this.prevClick.bind(this)} className="waves-effect waves-light btn">Previous</a>
        )
      }
    }

    const showNextBtn = () => {
      if(songList && (songList.length > 0) && (index < (songList.length - 1))){
        return (
          <a onClick={this.nextClick.bind(this)} className="waves-effect waves-light btn">Next</a>
        )
      }
    }

    const playBtn = () => {
      if(songList && (songList.length > 0) && (index < (songList.length - 1))){
        return (
          <div>
          <a onClick={this.goPlay.bind(this)} className="waves-effect waves-light btn">Play</a>
          </div>
        )
      }
    }

    return (
      <div>
        <Header/>
        <div className="row">
          <div className="input-field col s6">
            <input style={{
                width: '50%'
              }} type="text" onChange={this.searchSong.bind(this)} ref="songSearch" placeholder="Search"/>
            <br>
            </br>
          </div>
        </div>
        <div>
        </div>
          <div>
          {searchedSongs()}
            <p>Playlist Queue</p>
            {showSongs()}
        </div>
      </div>
    );
  }
};
