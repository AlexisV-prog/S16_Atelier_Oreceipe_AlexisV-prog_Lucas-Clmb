import { useState } from 'react';

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

  return ()
}

export default App
