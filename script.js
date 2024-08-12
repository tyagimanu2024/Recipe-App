const searchbox = document.querySelector(".searchbox");
const searchbtn = document.querySelector(".search-btn");
const recipeconatiner = document.querySelector(".recipe-conatiner");
const recipedetailscontent = document.querySelector(".recipe-details-content");
const recipeclosebtn = document.querySelector(".recipe-close-btn");

const fetchrecipe = async (query) => {
  recipeconatiner.innerHTML = "<h2>Fetching Recipes...</h2>";
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
  recipeconatiner.innerHTML = "";
  response.meals.forEach((meal) => {
    console.log(meal);
    const recipediv = document.createElement("div");
    recipediv.classList.add("recipe");
    recipediv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3> ${meal.strMeal}</h3>
    <p><span>${meal.strArea} </span>Dish</p> 
    <p>Belongs to <span>${meal.strCategory}</span> Category</p> `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipediv.appendChild(button);
    recipeconatiner.appendChild(recipediv);

    // adding event listener to button
    button.addEventListener("click", () => {
      openRecipePopup(meal);
    });
  });
};


const fetchIngredients=(meal)=>{
let ingredientsList="";
for (let i = 1; i <= 20; i++) {
  const ingredient=meal[`strIngredient${i}`];
    if(ingredient){
        const measure=meal[`strMeasure${i}`];
ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}
return ingredientsList;

}
const openRecipePopup = (meal) => {
  recipedetailscontent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2> 
    <h3>Ingredients:</h3> 
    <ul class="IngredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
    <h3 >Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    ;
  recipedetailscontent.parentElement.style.display = "block";
};




recipeclosebtn.addEventListener('click',()=>{
  recipedetailscontent.parentElement.style.display="none"  
})

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchinput = searchbox.value.trim();
  fetchrecipe(searchinput);
});
