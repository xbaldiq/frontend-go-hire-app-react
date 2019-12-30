import React, { Component } from 'react';
import './Styles/Card.css'

export default class Card extends Component {
  render() {
    // console.log(this.props)
    return (
        <div className='card'>
          <div className='card-image'>
            {/* <img src={img} width='245px'/> */}
          </div>
          <div className='card-text'>
            <span className='date'>Backend Developer</span>
            <h3>{this.props.name}</h3>
            <p>
              Skill: {this.props.skill || 'Belum diupdate'}
            </p>
          </div>
          <div className='card-stats'>
            <div className='stat'>
              <div className='value'>
                {this.props.total_project}
              </div>
              <div className='type'>Project</div>
            </div>
            <div className='stat border'>
              <div className='value'>{this.props.successrate}%</div>
              <div className='type'>Success Rate</div>
            </div>
            {/* <div className='stat'>
              <div className='value'>32</div>
              <div className='type'>comments</div>
            </div> */}
          </div>
        </div>
    );
  }
}
