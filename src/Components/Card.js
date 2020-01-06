import React, { Component } from 'react';
import './styles/Card.css'
import totalProject from './styles/Pict/icon-project.svg'
import successRate from './styles/Pict/icon-success-rate.svg'
import "typeface-roboto";

export default class newCard extends Component {
    render() {
        return (
            <div className="card-container">
                <div className="card-main">
                    <p className="card-text-name">{this.props.name || 'Margaery Tyrell'}</p>
                    <p className="card-text-description">{this.props.description || 'Fullstack Dev'}</p>
                    <div className="card-project">
                        <img src={totalProject} alt=""/>
                        <p className="card-text-total-project">{this.props.total_project || '77 Project'} Project</p>
                        <img src={successRate} alt=""/>
                        <p className="card-text-success-rate">{this.props.successrate || '99 Success Rate'}% Success Rate</p>
                    </div>
                    <hr color="grey" width="200"/>
                    <p className="card-text-list-skill">{this.props.skill || 'MySQL, React, PHP, MongoDB, Laravel, Docker'}</p>
                </div>
            </div>
        )
    }
}
