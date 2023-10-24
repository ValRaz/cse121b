/* W05: Programming Tasks */
/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
const templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) =>{
    //Creates an article element for each temple in the array list
    temples.forEach((temple) => {
        const articleElement = document.createElement("article");
        //Creates and H3 element to house the templeName property
        const h3Element = document.createElement("h3");
        h3Element.textContent = temple.templeName;
        //Creates the img element and sets src and alt attributes
        const imgElement = document.createElement("img");
        imgElement.src = temple.imageUrl;
        imgElement.alt = temple.location;
        //Appends the h3 and img elements to the article element as children
        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);
        //Appends the article element to the templesElement
        templesElement.appendChild(articleElement)
    })
}

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    //fetches data from temply array url
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    //converts data fetched to an object
    const data = await response.json();
    //assignes the converted data to the templeList global variable
    templeList.push(...data);
    //Calls displayTemples function
    displayTemples(templeList);
};

/* reset Function */
const reset  =() => {
    //Gets all the article elements within the templesElement
    const articles = templesElement.querySelectorAll("article");
    //Loops through and removes each article element
    articles.forEach(article => {
        templesElement.removeChild(article);
    });
};

/* sortBy Function */
//Gets the value of the sortBy HTML element
const sortBy = (temples) => {
    reset();
    const filter = document.getElementById("sortBy").value;
    //Switch statement based on filter options provided
    switch (filter) {
        case "utah":
            //Filter for temples that contain "Utah" in the location
            displayTemples(temples.filter(temple => temple.location.includes("Utah")));
            break;
        case "notutah":
            //Filter for temples that do not contain "Utah" in the location
            displayTemples(temples.filter(temple => !temple.location.includes("Utah")));
            break;
        case "older":
            //Filter for temples dedicated before 1950
            displayTemples(temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1)));
            break;
        case "all":
            //Shows all temple cards
            displayTemples(temples);
            break;
    };
};

/* Event Listener */
const sortByElement = document.getElementById("sortBy");
sortByElement.addEventListener("change", () => {
    sortBy(templeList);
});

getTemples();