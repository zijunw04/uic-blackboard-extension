// Variable to keep track of whether "X" buttons and top row have been added
var buttonsAndRowAdded = false;

// Function to dynamically add "X" marks to graded rows
function addDeleteButtons() {
  if (!buttonsAndRowAdded) {
    var gradedRows = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll("#grades_wrapper .graded_item_row");

    gradedRows.forEach(function (row) {
      var deleteButton = document.createElement("span");
      deleteButton.className = "delete-row-button";
      deleteButton.textContent = "X";

      deleteButton.addEventListener("click", function () {
        row.remove();
        calculateAndDisplayTotal(); // Recalculate total after row removal
      });

      row.appendChild(deleteButton);
    });

    addTotalRow();
    buttonsAndRowAdded = true;
  }
}

// Function to add a new row at the top for total grades, total points, and percentage
function addTotalRow() {
  var totalRow = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  totalRow.className = "total-row row";

  var descriptionBox = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  descriptionBox.className = "cell gradable";
  
  var description = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("span");
  description.textContent = "Class Total Grade (By Zi Jun Wang)"

  var extlink = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("a");
  extlink.textContent = "Extension Website"
  extlink.setAttribute("href", "https://floatsink.me");
  extlink.setAttribute("target", "_blank");

  var totalGradeCell = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  totalGradeCell.className = "cell grade";
  totalGradeCell.textContent = "Total Grades: ";

  var totalPointsCell = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  totalPointsCell.className = "cell pointsPossible";
  totalPointsCell.textContent = "";

  var percentageCell = document.querySelector(".classic-learn-iframe").contentWindow.document.createElement("div");
  percentageCell.className = "cell percentage grade";
  percentageCell.textContent = "Percentage: ";

  totalRow.appendChild(descriptionBox);
  descriptionBox.appendChild(description);
  descriptionBox.appendChild(extlink);

  totalRow.appendChild(totalGradeCell);
  totalRow.appendChild(totalPointsCell);
  totalRow.appendChild(percentageCell);

  var gradesTable = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector("#grades_wrapper");
  gradesTable.insertBefore(totalRow, gradesTable.firstChild);
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

  // Filter out rows with evaluation links
  var rowsWithEvalLinks = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll(".sortable_item_row.calculatedRow.row.expanded.eval-links");
  var excludedRows = Array.from(rowsWithEvalLinks);

  // Extract numeric content from grade elements, excluding rows with eval-links
  var numericContentsGrade = extractNumericValues(
    Array.from(gradeElements).filter(function (element) {
      // Check if the element's parent row is in the excludedRows list
      return !excludedRows.includes(element.closest('.sortable_item_row'));
    }),
    false
  );

  // Extract numeric content from pointsPossible elements, excluding rows with eval-links
  var numericContentsPointsPossible = extractNumericValues(
    Array.from(pointsPossibleElements).filter(function (element) {
      // Check if the element's parent row is in the excludedRows list
      return !excludedRows.includes(element.closest('.sortable_item_row'));
    }),
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

  var totalGradeCell = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector(".total-row .grade");
  var totalPointsCell = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector(".total-row .pointsPossible");
  var percentageCell = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector(".total-row .percentage");

  totalGradeCell.textContent = totalGrade.toFixed(2) + " / " + totalPointsPossible.toFixed(2);
  percentageCell.textContent = "Percentage: " + percentage.toFixed(2) + "%";
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkID") {
    addDeleteButtons();

    calculateAndDisplayTotal();

    sendResponse({});
  } else if (request.action === "removeButtons") {
    var deleteButtons = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelectorAll(".delete-row-button");
    deleteButtons.forEach(function (button) {
      button.remove();
    });

    var totalRow = document.querySelector(".classic-learn-iframe").contentWindow.document.querySelector(".total-row");
    if (totalRow) {
      totalRow.remove();
    }

    buttonsAndRowAdded = false;

    addDeleteButtons(); // Re-add "X" buttons and top row
    calculateAndDisplayTotal(); // Recalculate and update the top row

    sendResponse({});
  } else {
    sendResponse({});
  }
});
