import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
const API_URL = process.env.API_URL || "http://localhost:5000";

class Category extends Component {
    state = {
      categories: []     
    }

    async componentDidMount() {
        try {
            const { data } = await this.getCategories();
            this.setState({
              categories: data.category
            }); 
        } catch (error) {
          console.log(error);
        }
      }
  
    getCategories = () => {
        return axios
          .get(`${API_URL}/category`)
    }
  
    render() {
        const categories = this.state.categories;
        return (
            <>
            <Header />
            <div className="category">
                <div className="category__wrapper">
                    <div className="category__card-head"><h2 className="category__card-heading">Pick Category</h2></div>
                    {categories && categories.map((cat) => (
                        <div key={cat.id} className="category__card"><Link to={`/category/${cat.id}`} className="category__card-link"><p className="category__card-name">{cat.category}</p></Link></div>
                    ))}
                </div>
                <div className="category__container">
                    <div className="category__logo">
                        <div className="category__logo-image"></div>
                    </div>
                    <div className="category__photos">
                    {categories && categories.map((cat) => (
                        <Link key={cat.id} to={"/category/:id"}><img className="category__photos-size" src={`/images/${cat.imageName}`} alt="link" /></Link>
                    ))}
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Category;