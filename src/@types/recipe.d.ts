export default interface IRecipes {
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