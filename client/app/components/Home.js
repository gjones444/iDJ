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
        searchIndex: 0,
        playlist_db: [],
        signedIn: false,
        user: undefined
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
      console.log(results.user.username)
      if (results.message) {
        this.setState({user: results.user.username})
        if (results.message === "signed-in") {
          this.setState({signedIn: true})
        }
      }
    });
    
    {
      axios({
        method: 'get',
        url: '/api/playlist/'
        }).then((response) => {
          this.setState({
            playlist_db: response.data.playlist.rows
          })
        })
    };
  }
  
  searchSong(){
    let searchResult = this.refs.songSearch.value;
    SC.get('/tracks/',{
			q: searchResult,
      limit: 20
		}).then((results) => {
        this.setState({
          songList: results
        });
    })
  }
  
  addToPlaylist(id){
    let playlist_db_item = this.state.playlist_db.filter(item => item.id == id)
    let addingSong = this.state.songList[this.state.index]
      axios.post('/api/add-song', {
          song: addingSong.title,
          song_id: addingSong.id,
          uri: addingSong.uri,
          artwork: addingSong.artwork_url,
          votes_count: 0
        }).then((results) => {
          console.log("Song Added")
          this.setState({
            playlist_db: results.data.playlist.rows
          });
        }) 
    }

  render() {
    const {songList, index, voteIndex, playlist_db, signedIn, searchIndex} = this.state;
    const searchedSongs = () => {
      if(songList && songList.length > 0){
        return(
          <div>
          <span>
            <li><img src={songList[0].artwork_url}></img>   Title: {songList[0].title} <button onClick={() => this.addToPlaylist()}>Add to playlist</button></li>      
          </span>
          </div>
        )
      }
    }
    

    return (
      <div>
        <Header/>
        <p>User: {this.state.user}</p>
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
            <Playlist playlist_db={this.state.playlist_db}/>
          </div>
      </div>
    );
  }
};
