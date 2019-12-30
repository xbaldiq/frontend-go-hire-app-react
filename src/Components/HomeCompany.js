import React, { Component } from 'react'
import Navbar from './Navbar'
import Card from './Card'
import CssBaseline from "@material-ui/core/CssBaseline";

class HomeCompany extends Component {
    constructor(){
        super()
        
        // this.handleOnChange = this.handleOnChange.bind(this);
    }

    
    render() {
        return (
            <>
                <CssBaseline />
                <Navbar />
                <Card />    
            </>
        )
    }
}


export default HomeCompany;