import React from 'react'
import About from './About';
import Header from './Header';

function Home() {
    return (
        <div>
            <Header />
            <About />
              <div className="main-comment">
                <div className="main-comment__top">
                    <p className="main-comment__name">NAME</p>
                    <p className="main-comment__time">TIME</p>
                </div>
                <div className="main-comment__bottom">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Doloribus repellat nulla deserunt, vitae eos aliquid facilis 
                    cupiditate iste, delectus quasi corrupti quaerat in.
                </div>
                <div className="main-comment__bottom">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Doloribus repellat nulla deserunt, vitae eos aliquid facilis 
                    cupiditate iste, delectus quasi corrupti quaerat in.
                </div>
                <div className="main-comment__bottom">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Doloribus repellat nulla deserunt, vitae eos aliquid facilis 
                    cupiditate iste, delectus quasi corrupti quaerat in.
                </div>
            </div> 
        </div>
    )
}

export default Home
