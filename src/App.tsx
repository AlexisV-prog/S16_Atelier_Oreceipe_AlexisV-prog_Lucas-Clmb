import { useState, useEffect } from 'react';
import {Routes, Route, Link} from 'react-router';
import axios from "axios";
import type IRecipes from "./@types/recipe";
import RecipePage from './Pages/Recipe';


function App() {

  const [recipes, setRecipes] = useState<IRecipes[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  useEffect (()=> {
   axios.get<IRecipes[]>("https://orecipesapi.onrender.com/api/recipes")
    .then((response) => {
    setRecipes(response.data)}
    );
  }, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://orecipesapi.onrender.com/api/login/', {
        email,
        password
      });

      const pseudo = response.data.pseudo;

      setMessage(`Bienvenue ${pseudo}`);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setMessage("Erreur de connexion : identifiants incorrects");
      } else {
        setMessage("Erreur serveur, réessayez plus tard");
      }
    }
  };
      
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
      <form onSubmit={handleSubmit}>
        <img alt="logo" src="./src/assets/Image/logo.png" className="logo-img"/>
        <input type="email" value={email} placeholder="Adresse Email" name="email" onChange={(event) => setEmail(event.target.value)} required/>
        <input type="password" placeholder="Mot de passe" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
        <button type="submit">OK</button>
      </form>

      {message && <p>{message}</p>}

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
            <button className="card-button"><Link className="button-link" to={`/${recipe.id}`}>Voir la recette</Link></button>
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
