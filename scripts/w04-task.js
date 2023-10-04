/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Valerie Rasmussen",
    photo: "images/Val.jpg",
    favoriteFoods: [
        "Tomagoyaki",
        "Homemade Pork Belly Ramen",
        "Good steak",
        "Nectarines",
        "Lychee",
        "Sweet and Savory pulled pork burritos"
    ],
    hobbies: [
        "Reading",
        "Writing Poetry",
        "Calligraphy",
        "Singing",
        "Drawing",
        "Playing Video Games",
    ],
    placesLived: [],
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {
        place: "Rexburg, ID",
        length: "8 months"
    }
);

myProfile.placesLived.push(
    {
        place: "Idaho Falls, ID",
        length: "6 months",
    }
);

myProfile.placesLived.push(
    {
        place: "Charlottesville, VA",
        length: "11 years",
    }
);

myProfile.placesLived.push(
    {
        place: "Fruitland, ID",
        length: "3 years",
    }
)
/* DOM Manipulation - Output */

/* Name */
document.querySelector("#name").textContent = myProfile.name;

/* Photo with attributes */
document.querySelector("#photo").src = myProfile.photo;
document.querySelector("#photo").alt = myProfile.name;

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let listItem = document.createElement('li');
    listItem.textContent = food;
    document.querySelector("#favorite-foods").appendChild(listItem);
});

/* Hobbies List */
myProfile.hobbies.forEach (hobby => {
    let listItem = document.createElement("li");
    listItem.textContent = hobby;
    document.querySelector("#hobbies").appendChild(listItem);
});

/* Places Lived DataList */
let placesLivedList = document.querySelector("#places-lived");

myProfile.placesLived.forEach(place => {
    let dtElement = document.createElement('dt');
    dtElement.textContent = place.place;
    let ddElement = document.createElement("dd");
    ddElement.textContent = place.length;

    placesLivedList.appendChild(dtElement);
    placesLivedList.appendChild(ddElement);
});

