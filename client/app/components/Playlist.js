import React, {Component} from 'react';
import SC from 'soundcloud';
import ReactPlayer from 'react-player'
import axios from 'axios';
import Home from './Home';


export default class Playlist extends Component {
  constructor(props){
    super(props);
    this.state = {
    playlist_db: this.props.playlist_db,
    voteCtn: 0
    }
  }

componentWillMount(){
  // {
  //   axios({
  //     method: 'get',
  //     url: '/api/playlist/'
  //   }).then((response) => {
  //         this.setState({
  //           playlist_db: response.data.playlist.rows
  //         })
  //     })
  // }
  setTimeout(() => {
    this.setState({
      playlist_db: this.props.playlist_db
    })
  }, 100)
  
}

  upVote(id){
    let playlist_db_item = this.props.playlist_db.filter(item => item.id == id)
    axios.put('/api/vote-up-down/' + id, {
      voteCtn: playlist_db_item[0].votes_count + 1
      }).then((results) => {
        this.setState({
          playlist_db: results.data.playlist.rows
        })
      })    
  }

  downVote(id){
    let playlist_db_item = this.props.playlist_db.filter(item => item.id == id)
    axios.put('/api/vote-up-down/' + id,{
      voteCtn: playlist_db_item[0].votes_count - 1
      }).then((results) => {
        this.setState({
          playlist_db: results.data.playlist.rows
        })
      })    
  }

  goPlay(){
       SC.stream(('/tracks/' + this.props.playlist_db[0].song_id)).then(function(player){
         player.play();
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

  render(){
    const {voteCtn, playlist_db} = this.state;
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
        this.props.playlist_db.length == playlist_db.length ?
          playlist_db.map((item, index) => {
              return (
                <div key={index}>
                  <table >
                      <tbody>
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.song}</td>
                            <td><button onClick={() => this.upVote(item.id)}>Up</button></td>
                            <td><button onClick={() => this.downVote(item.id)}>Down</button></td>
                            <td><button onClick={this.goPlay.bind(this)}>Play</button></td>
                            <td>{item.votes_count}</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
              )
          }) : this.props.playlist_db.length > playlist_db.length ?
            this.props.playlist_db.map((item, index) => {
                return (
                  <div key={index}>
                    <table >
                        <tbody>
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.song}</td>
                              <td><button onClick={() => this.upVote(item.id)}>Up</button></td>
                              <td><button onClick={() => this.downVote(item.id)}>Down</button></td>
                              <td><button onClick={this.goPlay.bind(this)}>Play</button></td>
                              <td>{item.votes_count}</td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                )
            }) : <div></div>
        }
      </div>
    )
  }
}
