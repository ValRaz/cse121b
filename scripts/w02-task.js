/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = 'Valerie Rasmussen';
const profilePicture = 'images/Val.jpg';

/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');
const imageElement = document.querySelector('img');

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
const currentYear = document.createElement('p');
currentYear.innerText = "2023";
yearElement.appendChild(currentYear);
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile image of ${fullName}`);

/* Step 5 - Array */
const favorites = ['Coconut Korma', 'Baked homemade macaroni and cheese', 'Garlic and herb roasted vegetables with balsalmic glaze', 'Medium rare filet mignon', 'Latkes']
let foodList = favorites.join(', ');
const newFavorite = 'Cherry pie';
favorites.push(newFavorite);
foodElement.innerHTML = foodList;
foodElement.innerHTML += `<br>${favorites}`;
favorites.shift();
foodElement.innerHTML += `<br>${favorites}`;
favorites.pop();
foodElement.innerHTML += `<br>${favorites}`;