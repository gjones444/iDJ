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
                <source src='https://cf-e2.streamablevideo.com/video/mp4/95ev8.mp4?token=1521099418-e6tMx%2Bh8h5LqkVU04qsPyuMN8PGENGDH8PhEeNEaspI%3D' type="video/mp4" />
                <source src='./bgvid.mp4' type="video/ogg" />
            </video>
            
          </div>
        )
    }
};

export default BGVideo;
