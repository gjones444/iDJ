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
      if (results.message) {
        this.setState({user: results.user.username})
        if (results.message === "signed-in") {
          this.setState({signedIn: true})
        }
      }
    });

    {
      axios({
        method: 'GET',
        url: '/api/playlist/'
      }).then((songs) => {
          this.setState({
            playlist_db: songs.data
          })
        })
    };

    alert('Welcome To iDJ. Use the search bar to add your song to the playlist. Remember to vote for the song to move it up or down in rank. Songs with the most votes will be played next.')
  }

  searchSong(){
    let searchResult = this.refs.songSearch.value;

    SC.get('/tracks/',{
			q: searchResult,
      limit: 50
		}).then((results) => {
        this.setState({
          songList: results
        });
    })
  }

  addToPlaylist(id){
    let addingSong = this.state.songList.filter(item => item.id == id)[0];
      axios.post('/api/add-song', {
          song: addingSong.title,
          song_id: addingSong.id,
          uri: addingSong.uri,
          artwork: addingSong.artwork_url,
          votes_count: 0
        }).then((results) => {
          console.log("Song Added")
          this.setState({
            playlist_db: results.data
          });
        })
    }

    goPlay(){
         SC.stream(('/tracks/' + this.state.playlist_db[0].song_id)).then(function(player){
           if (player) {
             player.play();
           }
         });
    }

  render() {
    const {songList, index, voteIndex, playlist_db, signedIn, searchIndex} = this.state;
    const searchedSongs = () => {
      if(songList && songList.length > 0){
        return(
            <div className="container scroll-search text-center">
                    {
                    songList.map((item, index) => {
                        return (
                              <div key={index} className="row">
                                <div>
                                  <ui className="col s3"><img src={item.artwork_url}></img></ui>
                                  <p className="col s5">{item.title}</p>
                                  <button className="waves-effect waves-light btn blue-grey col s2" onClick={() => this.addToPlaylist(item.id)}><i className="material-icons text-center">playlist_add</i></button>
                                </div>
                              </div>
                               )
                    })
                  }
            </div>
        )
      }
    }

    return (
      <div>
        <Header/>
        <div className="row container">
          <div >
          <i className="red-text material-icons prefix">search</i>
            <input style={{
                width: '50%'
              }} type="text" onChange={this.searchSong.bind(this)} ref="songSearch" placeholder="Search by your favorite artist or song" id="search-bar"/>
            <br>
            </br>
          </div>
        </div>
        <div>
        {searchedSongs()}
      </div>
          <div className="container" id="playlist-area">
            <h3>Playlist Queue  <button className="btn-floating btn-large waves-effect waves-light red" onClick={this.goPlay.bind(this)} id="playBtn"><i className="material-icons">play_arrow</i></button></h3>
            <Playlist playlist_db={this.state.playlist_db}/>
          </div>
      </div>
    );
  }
};
