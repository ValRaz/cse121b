const practice = ['one','two','three'];
const practiceHtml = steps.map(function(step) {
    return `<li>${step}</li>`;
});
document.getElementById("myList").innerHTML = practiceHtml.join();
//converts strings from an array into html strings using map method

const practiceTwo = ['A', 'B', 'A'];
function gradeConversion(grade) {
    let points = 0;
    if(grade === 'A') {
        points = 4;
    } else if (grade ==='B') {
        points = 3;
    }
    return points;
}
const gpaPoints = practiceTwo.map(gradeConversion);
//converts letter grades from an array into points using map method and conversion function

const gradePointsTotal = gpaPoint.reduce(function (total, item) {
    return total + item;
});
const gpa = gradePointsTotal / gpaPoints.length;
// condenses grade points into a single number from the converted array

filterPractice = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
filterFruits = filterPractice.filter((fruit) => fruit.length < 6);
console.log(filterFruits);
//uses the filter method to return only fruits with names longer than 6 characters

const findIndexPractice = [12, 34, 21, 54];
const luckNumber = 21;
let luckyIndex = findIndexPractice.indexOf(luckNumber);
//use indexOf method to check for the presence of a number within an array