import React, { Component } from 'react';
import './styles2/Card.css'
import img from './styles2/img1.jpg'

export default class Card extends Component {
  render() {
    return (
      <div>
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
                40<sup>'s</sup>
              </div>
              <div className='type'>Project</div>
            </div>
            <div className='stat border'>
              <div className='value'>99%</div>
              <div className='type'>Success Rate</div>
            </div>
            {/* <div className='stat'>
              <div className='value'>32</div>
              <div className='type'>comments</div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
