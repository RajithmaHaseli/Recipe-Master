import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const RecipeList = () => {
  // Dummy data for recipes
  const recipes = [
    { id: 1, name: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
    { id: 2, name: 'Chicken Curry', description: 'A spicy and flavorful chicken dish.' },
    { id: 3, name: 'Chocolate Cake', description: 'A rich and moist chocolate cake.' },
  ];

  return (
    <div className="recipe-list">
      <Navbar/>
      <h1 className="recipe-list-title">Recipe List</h1>
      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3 className="recipe-name">{recipe.name}</h3>
            <p className="recipe-description">{recipe.description}</p>
            <Link to={`/review`} >
            <button className="rate-button">Rate</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
