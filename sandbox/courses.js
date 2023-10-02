// courses.js
const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
        {
            sectonNum: 1,
            roomNum: 'STC 353',
            enrolled: 26,
            days: 'TTh',
            instructor: 'Bro T' 
        },
        {
            sectionNum: 1,
            roomNum: 'STC 347',
            enrolled: 28,
            days: 'TTh',
            instructor: 'Sis A'
        },
    ],

    //Either adds to or drops from enrollment count per user input
    adjustEnrollment: function(sectionNum, add = true) {
        const sectionIndex = this.sections.findIndex(
            (section) => section.sectionNum == sectionNum
        );
        if (sectionIndex >= 0) {
            if (add){
                this.sections[sectionIndex].enrolled++;
            } else {
                this.sections[sectionIndex].enrolled--;
            }
            tableSections(this.selections)
        }
    }
};

//Takes the course data from the object and applies it to the appropriate html element
function setCourseInfo(course) {
    const courseName = document.querySelector("#courseName");
    const courseCode = document.querySelector("#courseCode");
    courseName.textContent = course.name;
    courseCode.textContent = course.code; 
}

//Takes course data and displays in the html element table identified by #sections
function tableSections(sections) {
    const html = sections.map(
        (section) => `<tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}<td></tr>`
    );
    document.querySelector("#section").innerHTML = html.join("");
}

//Adds event listener to the enroll button, takes input from the section number element to pass to the appropriate function
document.querySelector("#enrollStudent").addEventListener("click", function() {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.adjustEnrollment(sectionNum);
});

//Adds event listener to the enroll button, takes input from the section number element to pass to the appropriate function
document.querySelector("#dropStudent").addEventListener("click", function() {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.adjustEnrollment(sectionNum);
});

setCourseInfo(aCourse);
tableSections(aCourse.sections);

