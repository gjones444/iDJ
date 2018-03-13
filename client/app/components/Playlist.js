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
          playlist_db: results.data
        })
      })    
  }

  downVote(id){
    let playlist_db_item = this.props.playlist_db.filter(item => item.id == id)
    axios.put('/api/vote-up-down/' + id,{
      voteCtn: playlist_db_item[0].votes_count - 1
      }).then((results) => {
        this.setState({
          playlist_db: results.data
        })
      })    
  }

  render(){
    const {voteCtn, playlist_db} = this.state;
    return (
      <div className="Table-headers">
        <table>
          <thead>
              <tr className="row">
                <th className="col s3">Song Title</th>
                <th className="col s3">Vote Up</th>
                <th className="col s3">Vote Down</th>
                <th className="col s3">Vote Count</th>
              </tr>
          </thead>
        </table>
        
      {
        this.props.playlist_db.length == playlist_db.length ?
          playlist_db.map((item, index) => {
              return (
                <div key={index}>
                  <table className="highlight">
                      <tbody>
                          <tr className="row text-center">
                            <td className="col s3">{item.song}</td>
                            <td className="col s3"><button onClick={() => this.upVote(item.id)}><i className="material-icons">thumb_up</i></button></td>
                            <td className="col s3"><button onClick={() => this.downVote(item.id)}><i className="material-icons">thumb_down</i></button></td>
                            <td className="col s3">{item.votes_count}</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
              )
          }) : this.props.playlist_db.length > playlist_db.length ?
            this.props.playlist_db.map((item, index) => {
                return (
                  <div key={index}>
                    <table>
                        <tbody>
                            <tr className="text-center">
                              <td>{item.song}</td>
                              <td><button onClick={() => this.upVote(item.id)}>Up</button></td>
                              <td><button onClick={() => this.downVote(item.id)}>Down</button></td>
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
