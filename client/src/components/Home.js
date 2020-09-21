import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import Header from './Header';
import axios from 'axios';
import * as Constant from './Constants';
import { format } from 'timeago.js';

const url = Constant.API_URL;

class Home extends Component {
    state = {
       comments: []     
    }
  
    async componentDidMount() {
        try {
            const { data } = await this.getComment();
            Constant.verifyResponse(data.error);
            //order comments by time in descending order
            this.setState({
                comments: data.comment && data.comment.sort(function(a, b){ return new Date(b.comment_at) - new Date(a.comment_at) })
            });
        } catch (error) {
        console.log(error);
        }
    }
    
    getComment = () => {
        //get last 2 comments from database
        return axios
        .get(`${url}/comment?count=2`, {
            headers: {
                authorization: `BEARER ${Constant.getToken()}`
            }
        });   
    }
    
    render() {
        const { comments } = this.state;
        return (
            <>
                <Header />
                <div className="nav-comment">
                    <div className="nav">
                        <div className="nav__text">PLAY&nbsp;&nbsp;<i className="far fa-hand-point-right  nav__text-icon"></i></div>
                        <Link to="/category"><div className="nav__image"></div></Link>
                    </div>
                    <About />
                </div>
                <div className="main-comment">
                {comments && comments.map((comment) => 
                    <div className="main-comment__wrapper" key={comment.id}>
                        <div className="main-comment__top">
                            <p className="main-comment__name">{comment.username}</p>
                            <p className="main-comment__time">{format(comment.comment_at)}</p>
                        </div>
                        <div className="main-comment__bottom">{comment.comment}
                        </div>
                    </div>
                )}
                </div>
            </>
        )
    }
}

export default Home
