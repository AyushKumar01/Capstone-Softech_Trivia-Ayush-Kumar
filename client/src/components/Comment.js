import React, { Component } from 'react'
import * as Constant from './Constants';
import axios from 'axios';
import Header from './Header';
import { format } from 'timeago.js';
const url = Constant.API_URL;

class Comment extends Component {
    state = {
    comments: []     
}
async componentDidMount() {
    try {
        const { data } = await this.getComment();
        this.setState({
        comments: data.comment && data.comment.sort(function(a, b){ return new Date(b.comment_at) - new Date(a.comment_at) })
        });
    } catch (error) {
    console.log(error);
    }
}
getComment = () => {
    let token = Constant.token; 
    if(!token){
        token = localStorage.getItem('jwt_token');
    }
    return axios
    .get(`${url}/comment`, {
        headers: {
            authorization: `${token}`
    }})   
}
    render() {
        const { comments } = this.state;
        return (
            <>
                <Header />
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
export default Comment;