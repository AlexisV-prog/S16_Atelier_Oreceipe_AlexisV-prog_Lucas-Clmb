import { useState, useEffect } from 'react';
import axios from "axios";

interface IRecipes {
  id: number,
  title: string,
  slug: string,
  thumbnail: string,
  author: string,
  difficulty: string,
  description: string,
  instructions: [
    string
  ],
  ingredients: [
    {
      name: string,
      id: number,
      quantity: number,
      unit: string
    }
  ]
}

function App() {

  const [recipes, setRecipes] = useState<IRecipes[]>([]);


  useEffect (()=> {
   axios.get<IRecipes[]>("https://orecipesapi.onrender.com/api/recipes")
    .then((response) => {
    setRecipes(response.data)}
    );
  }, [])

  return ( 
  <div className='app'>
    <header>
      <ul>
        <li><a href="#">Accueil</a></li>
        <li><a href="#">Macaron framboisier</a></li>
        <li><a href="#">Tarte au citron meringuée</a></li>
        <li><a href="#">Amandier</a></li>
        <li><a href="#">Fondant au chocolat sans gluten</a></li>
      </ul>
    </header>

    <main>
      <form>
        <img alt="logo" src="./src/assets/Image/logo.png" className="logo-img"/>
        <input type="text" placeholder="Adresse Email"/>
        <input type="password" placeholder="Mot de passe"/>
        <button type="submit">OK</button>
      </form>

      <div>
        <h1>Les recettes oRecipes</h1>
        <h3>Voici nos 4 recettes</h3>

        <div className="card-container">
          {recipes.map((recipe)=> (
              
          <article className="card" key={recipe.id}>
            <img alt="" className="card-img" src={recipe.thumbnail}/>
            <h2 className="card-title">{recipe.title}</h2>
            <p className="card-difficulty">Difficulté: {recipe.difficulty}</p>
            <button className="card-button"><a href="#">Voir la recette</a></button>
          </article>
          ))}
        </div>

      </div>
    </main>
  </div>
  );

  }

export default App;
