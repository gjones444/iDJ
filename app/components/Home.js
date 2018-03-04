import React, {Component} from 'react';
import SC from 'soundcloud';
import axios from 'axios';
import Playlist from './Playlist';
import Header from './Header';

export default class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        songList: [],
      };
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
      for (var i = 0; i < results.length; i++) {
        this.setState({songList: results[i]})
      }
    })

  }

  playIt(){
    var sound = SC.stream("/tracks/293", function(music){
        sound.play();
        console.log("Pressed")
    });
}

  render() {
    let Film = this.state.songList
    console.log(Film)
    const displayMovieData = () => {

      if (Film) {
        return (<div className="Show">
          <a>
            <img src={Film.artwork_url}></img>
          </a>
          <p>Song Artist Name: {Film.permalink}</p>
          <p>Song Title: {Film.title}</p>
            <a style={{
                width: '10%'
              }}>
              <img src={Film.waveform_url}></img>
            </a>
        </div>)
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
          <button onClick={this.playIt.bind(this)}>Press this button</button>
        </div>
      </div>
      {displayMovieData()}
      <div>
        <p>Playlist Queue</p>
        <Playlist/>
    </div>
    </div>
    );
  }
};
