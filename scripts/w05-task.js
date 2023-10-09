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


/* sortBy Function */



getTemples();

/* Event Listener */
