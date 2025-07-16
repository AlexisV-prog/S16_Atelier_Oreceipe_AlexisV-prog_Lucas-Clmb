import { useState, useEffect } from 'react';
import {Routes, Route, Link} from 'react-router';
import axios from "axios";
import type IRecipes from "./@types/recipe";
import RecipePage from './Pages/Recipe';


function App() {

  const [recipes, setRecipes] = useState<IRecipes[]>([]);


  useEffect (()=> {
   axios.get<IRecipes[]>("https://orecipesapi.onrender.com/api/recipes")
    .then((response) => {
    setRecipes(response.data)}
    );
  }, [])

  axios.get<IRecipes>("https://orecipesapi.onrender.com/api/recipes/")
  return ( 
  <div className='app'>
    <header>
      <ul>
        <li><a href="#">Accueil</a></li>
        {recipes.map((recipe)=> (
          <li key={recipe.id}><a href="#">{recipe.title}</a></li>
        ))
        }
      </ul>
    </header>

    <main>
      <form>
        <img alt="logo" src="./src/assets/Image/logo.png" className="logo-img"/>
        <input type="text" placeholder="Adresse Email"/>
        <input type="password" placeholder="Mot de passe"/>
        <button type="submit">OK</button>
      </form>

        <Routes>
          <Route
          path="/"
          element={
      <div>
        <h1>Les recettes oRecipes</h1>
        <h3>Voici nos 4 recettes</h3>

        <div className="card-container">
          {recipes.map((recipe)=> (
              
          <article className="card" key={recipe.id}>
            <img alt="" className="card-img" src={recipe.thumbnail}/>
            <h2 className="card-title">{recipe.title}</h2>
            <p className="card-difficulty">Difficulté: {recipe.difficulty}</p>
            <button className="card-button"><Link to={`/${recipe.id}`}>Voir la recette</Link></button>
          </article>
          ))}
        </div>

      </div>

          }/>
            <Route
            path="/:id"
            element={<RecipePage recipes={recipes} />}/>

      </Routes>
    </main>
  </div>
  );

  }

export default App;
