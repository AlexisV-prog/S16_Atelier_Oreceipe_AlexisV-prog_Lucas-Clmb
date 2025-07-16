import type IRecipes from "../@types/recipe";
import { useParams } from "react-router";

export default function RecipePage({recipes}: {recipes: IRecipes[]}){
    const params = useParams();
    const recipeIdFromURL = params.id;
    const recipeToDisplay = recipes.find(
        (recipe) => recipe.id === Number(recipeIdFromURL),

    );

    if (!recipeToDisplay){
        return(
            <main>
                <h1>Recette inexistante</h1>
            </main>
        );
    }
    return (
        // <article className="card" key={recipe.id}>
        //     <img alt="" className="card-img" src={recipe.thumbnail}/>
        //     <h2 className="card-title">{recipe.title}</h2>
        //     <p className="card-difficulty">Difficulté: {recipe.difficulty}</p>
        //     <button className="card-button"><a href="#">Voir la recette</a></button>
        //   </article>
        <div className="recipe-container">
            <h1>{recipeToDisplay.title}</h1>
            <img src={recipeToDisplay.thumbnail} alt="" />
            <p>{recipeToDisplay.author} - {recipeToDisplay.difficulty} - {recipeToDisplay.description}</p>

            <ul>
                {recipeToDisplay.ingredients.map((ingredient)=> (
                    <li key={ingredient.id}>{ingredient.quantity}{ingredient.unit} {ingredient.name}</li>

                ))
                }
            </ul>

            <ul>
                {recipeToDisplay.instructions.map((instruction)=> (
                <li key={instruction}>{instruction}</li>
                ))
                }
            </ul>
        </div>
    )
}