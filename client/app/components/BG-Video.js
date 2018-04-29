import React, {Component} from 'react';

class BGVideo extends Component {
    constructor (props) {
        super(props);

        this.state = {

        }
    }

    render () {
        return (
          <div>
          
            <video id="background-video" loop autoPlay>
                <source src='https://streamable.com/6ybth' type="video/mp4" />
            </video>
            
          </div>
        )
    }
};

export default BGVideo;
