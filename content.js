// Variable to keep track of whether "X" buttons and top row have been added
var buttonsAndRowAdded = false;

// Function to dynamically add "X" marks to graded rows
function addDeleteButtons() {
  var runTheRevamp = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll("#grades_wrapper .graded_item_row").length > 0;
  if (runTheRevamp) {
    if (!buttonsAndRowAdded) {
      var gradedRows = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll("#grades_wrapper .graded_item_row");

      gradedRows.forEach(function (row) {
        var deleteButton = document.createElement("span");
        deleteButton.className = "delete-row-button";
        deleteButton.setAttribute("style", "cursor: pointer; font-size: 15px;");
        deleteButton.textContent = "X";

        deleteButton.addEventListener("click", function () {
          row.remove();
          calculateAndDisplayTotal(); // Recalculate total after row removal
        });

        row.appendChild(deleteButton);
      });
      
      gradePage()
      
    }
  }
}




function gradePage() {
  //Flex
  var flexBox = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector(".contentBox");
  flexBox.setAttribute("style", "display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));");

  //Remove MyGrade title make flex
  var myGradeRemove = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector("#pageTitleDiv");
  myGradeRemove.remove()

  //Get Class Name
  var className = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector("#crumb_1");
  className = className.innerText;

  //Change Container
  var containerOver = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector("#containerdiv");
  containerOver.setAttribute("style", "overflow-y: scroll; max-height:87vh; min-height:87vh; overflow-x: hidden;");


  var classData = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  classData.setAttribute("style", "display: flex; margin-top: 20px; background: white; padding: 20px 10% 20px 10%; border: 2px solid #cdcdcd; max-height:87vh; flex-wrap: wrap; flex-direction: column; align-items: center; margin-right: 10px;");

  
  //Class Box
  var classDataTitle = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  classDataTitle.className = "uic-class-title";
  classDataTitle.setAttribute("style", "border-radius: 20px; border: 1px solid #000; display:flex; justify-content: center; align-items: center; width: 100%; height: 139px; flex-direction: column;");
  

  var classTitle = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("h1");
  classTitle.textContent = "Classes: "
  classTitle.setAttribute("style", "color: #000; text-align: center; font-size: 40px; margin: 0px;");

  var classDataName = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("p");
  classDataName.textContent = className
  classDataName.setAttribute("style", "color: #000; text-align: center; font-size: 20px;");

  classDataTitle.append(classTitle)
  classDataTitle.append(classDataName)
  

  //Grade Section
  var grading = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  grading.setAttribute("style", "display:flex; justify-content: space-between; align-items: center; width: 100%; height: 150px; flex-direction: row;");
  
  //Total Grade
  var totalGradeBox = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  totalGradeBox.className = "total_grades";
  totalGradeBox.setAttribute("style", "display:flex; justify-content: center; align-items: center; width: 48%; height: 130px; flex-direction: column ; border-radius: 20px; border: 1px solid #000;");

  var totalGradeText = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("h1");
  totalGradeText.textContent = "Total Points (Grades/Points)";
  totalGradeText.setAttribute("style", "color: #000; text-align: center; font-size: 20px; margin: 0px;");


  var totalGradeData = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("p");
  totalGradeData.className = "uic-grade";
  totalGradeData.textContent = "";
  totalGradeData.setAttribute("style", "color: #000; text-align: center; font-size: 20px;");

  totalGradeBox.append(totalGradeText);
  totalGradeBox.append(totalGradeData);

  //Total Grade
  var percentageBox = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  percentageBox.className = "total_percentage";
  percentageBox.setAttribute("style", "display:flex; justify-content: center; align-items: center; width: 48%; height: 130px; flex-direction: column ; border-radius: 20px; border: 1px solid #000;");

  var percentageText = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("h1");
  percentageText.textContent = "Percentage";
  percentageText.setAttribute("style", "color: #000; text-align: center; font-size: 20px; margin: 0px;");


  var percentageData = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("p");
  percentageData.className = "uic-percentage";
  percentageData.textContent = "";
  percentageData.setAttribute("style", "color: #000; text-align: center; font-size: 20px;");

  percentageBox.append(percentageText);
  percentageBox.append(percentageData);


  grading.append(totalGradeBox);
  grading.append(percentageBox);


  //Misc
  var miscContent = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  miscContent.className = "miscContent";
  miscContent.setAttribute("style", "border-radius: 20px; border: 1px solid #000; display:flex; width: 100%; height: 50vh; flex-direction: column;");


  var searchBar = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("input");
  searchBar.type = "text";
  searchBar.setAttribute("style", "margin-top: 10px; margin-left: 10px; width: 95%; height: 53px; border-radius: 17px; border: 1px solid #000; font-size: 20px; ");
  searchBar.placeholder = "Search for an assignment...";
  searchBar.addEventListener("input", function (event) {
    var searchTerm = event.target.value.toLowerCase();
    filterAndDisplayResults(searchTerm);
  });

  
  miscContent.append(searchBar)


  classData.append(classDataTitle);
  classData.append(grading);
  classData.appendChild(miscContent);

  


  flexBox.append(classData, containerOver.nextSibling);




}


function filterAndDisplayResults(searchTerm) {
  var assignments = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll(".sortable_item_row .gradable");

  assignments.forEach(function (assignment) {
    var courseName = assignment.textContent.toLowerCase();
    var isVisible = courseName.includes(searchTerm);

    var gradedItemRow = assignment.closest('.sortable_item_row');
    if (gradedItemRow) {
      gradedItemRow.style.display = isVisible ? "block" : "none";
    }
  });
}

function filterCourses(searchCourses) {
  var coursesList = document.querySelectorAll("#container-term-current .subheader");
  console.coursesList
  coursesList.forEach(function (courses) {
    var courseName = courses.textContent.toLowerCase();
    var isVisible = courseName.includes(searchCourses);

    var courseRow = courses.closest('.active-course');
    console.log(courseRow)
    if (courseRow) {
      courseRow.style.display = isVisible ? "block" : "none";
    }
  });
}




// Function to calculate and display total grades, total points, and percentage
function calculateAndDisplayTotal() {
  // Find all elements with the specified class within the iframe
  var gradeElements = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll("#grades_wrapper .graded_item_row .cell .grade");
  var pointsPossibleElements = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll("#grades_wrapper .graded_item_row  .cell .pointsPossible");

  // Function to extract only numeric values from element text content
  function extractNumericValues(elements, isPointsPossible) {
    return Array.from(elements).map(function (element) {
      var text = element.textContent.trim();
      // Use a specific regular expression for pointsPossibleElements
      var regex = isPointsPossible ? /(\d+(\.\d+)?)/ : /^\d+(\.\d+)?$/;

      // Check if the text contains only numeric characters
      if (regex.test(text)) {
        // Extract numeric values using a regular expression
        return parseFloat(text.replace(/[^\d.]/g, ''));
      } else {
        return null; // Exclude elements with non-numeric characters
      }
    }).filter(function (numericValue) {
      return numericValue !== null;
    });
  }

  // Extract numeric content from grade elements
  var numericContentsGrade = extractNumericValues(
    Array.from(gradeElements),
    false
  );

  // Extract numeric content from pointsPossible elements
  var numericContentsPointsPossible = extractNumericValues(
    Array.from(pointsPossibleElements),
    true
  );

  // Exclude specified number of credits
  var excludeGrade = 0; // Change this value if needed
  var excludePoints = 0; // Change this value if needed

  // Calculate total grade and total possible points
  var totalGrade = numericContentsGrade.reduce(function (acc, value) {
    return acc + value;
  }, 0) - excludeGrade;

  var totalPointsPossible = numericContentsPointsPossible.reduce(function (acc, value) {
    return acc + value;
  }, 0) - excludePoints;

  // Calculate the percentage
  var percentage = totalPointsPossible === 0 ? 0 : (totalGrade / totalPointsPossible) * 100;

  // Log the results
  console.log("Numeric contents (Grade):", numericContentsGrade);
  console.log("Numeric contents (Points Possible):", numericContentsPointsPossible);
  console.log("Total Grade:", totalGrade);
  console.log("Total Points Possible:", totalPointsPossible);
  console.log("Percentage:", percentage);

  var totalGradeCell = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector(".total_grades .uic-grade");
  var percentageCell = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector(".total_percentage .uic-percentage");

  totalGradeCell.textContent = totalGrade.toFixed(2) + " / " + totalPointsPossible.toFixed(2);
  percentageCell.textContent = "Percentage: " + percentage.toFixed(2) + "%";
}


function isGradesPage() {
  var urlPattern = "https://uic.blackboard.com/ultra/grades";
  return window.location.href === urlPattern;
}


function processGradesPage() {
  if (isGradesPage()) {
    var gradePageContent = document.querySelector("#container-term-current .grades-list .base-grades-term-wrapper");
    
    if (gradePageContent) {
      
      var gradeContent = document.querySelector("#container-term-current .grades-list .base-grades-term-wrapper");
      gradeContent.setAttribute("style", "display: flex; flex-direction: row; flex-wrap: wrap; margin: 0px; min-width: 90vw; justify-content: center;");

      var gradeCourses = gradeContent.querySelectorAll(".active-course");

      gradeCourses.forEach(function (course) {
        course.setAttribute("style", "width: 500px; height: 450px; margin-left: 10px; margin-right: 10px;");
      });

      var searchAva = document.querySelector(".current-term .searchCourses")
      if (!searchAva) {
        var searchCourses = document.createElement("input");
        var gradeContentPage = document.querySelector("#container-term-current .current-term");
        searchCourses.className = "searchCourses"
        searchCourses.type = "text";
        searchCourses.setAttribute("style", "width: 300px; height: 53px; border-radius: 17px; border: 1px solid #000; font-size: 20px; margin-left: auto; margin-right: auto; margin-bottom: 30px; ");
        searchCourses.placeholder = "Search for a course...";
        searchCourses.addEventListener("input", function (event) {
          var searchCourses = event.target.value.toLowerCase();
          filterCourses(searchCourses);
        });

        gradeContentPage.insertBefore(searchCourses, gradeContentPage.children[1]);


      }
      
    }
  }
}

function observeDOMChanges() {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
    
      processGradesPage();
    });
  });

  var targetNode = document.body;

  var config = { childList: true, subtree: true };


  observer.observe(targetNode, config);
}


processGradesPage();

observeDOMChanges();



// Listen for messages from the popup
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "gradeRevamp") {
    
    addDeleteButtons();
    
    calculateAndDisplayTotal();

    sendResponse({});
  } 
  else if (request.action === "removeButtons") {
    var deleteButtons = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll(".delete-row-button");
    deleteButtons.forEach(function (button) {
      button.remove();
    });


    buttonsAndRowAdded = false;

    addDeleteButtons(); // Re-add "X" buttons and top row
    calculateAndDisplayTotal(); // Recalculate and update the top row

    sendResponse({});
  } 
  else if (request.action === "myGradeChange") {
  }
  else {

  }
});
