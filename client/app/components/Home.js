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
        playlist_db: [],
        signedIn: false
      };
  }


  componentWillMount(){
    SC.initialize({
      client_id: 'ebe2d1362a92fc057ac484fcfb265049'
    });

    fetch('/api/signed-in', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => response.json()).then((results) => {
      console.log(results)
      if (results.message) {
        if (results.message === "signed-in") {
          this.setState({signedIn: true})
        }
      }
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

  showPlaylist(){
    axios({
      method: 'get',
      url: '/api/playlist/'
    }).then((response) => {
      console.log(response)
          this.setState({
            playlist_db: response.data.playlist.rows
          });
      })

  }

  addToPlaylist(){
      axios.post('/api/add-song',{
          song: this.state.songList[this.state.index].title,
          song_id: this.state.songList[this.state.index].id,
          uri: this.state.songList[this.state.index].uri,
          artwork: this.state.songList[this.state.index].artwork_url,
          votes_count: 0
        })
        console.log("Song Added")
    }




  render() {
    const {songList, index, voteIndex, playlist_db, signedIn} = this.state;
    const searchedSongs = () => {
      if(songList && songList.length > 0){
        return(
          <div>
          <span>
            <li><img src={songList[0].artwork_url}></img>   Title: {songList[0].title} <button onClick={this.addToPlaylist.bind(this)}>Add to playlist</button></li>
          </span>
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
            <Playlist/>
        </div>
      </div>
    );
  }
};
