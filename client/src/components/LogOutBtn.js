import React, { Component } from 'react';
import * as Constant from './Constants';

class LogOutBtn extends Component {
    logout = () => {
        Constant.logoutUser();
        window.location.href = '/';
    }

    render() {
        return (
            <>
            <button className={this.props.className} onClick={this.logout}>{this.props.text}</button>
            </>
        )   
    }
}

export default LogOutBtn;