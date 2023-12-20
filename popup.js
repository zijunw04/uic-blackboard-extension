// Listen for the "Check Grades" button click
document.getElementById("checkGradeButton").addEventListener("click", function () {
  // Send a message to the content script to check grades
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    browser.tabs.sendMessage(activeTab.id, { action: "checkID" }, function (response) {
      // Handle the response if needed
    });
  });
});

// Listen for the "Remove Buttons" button click
document.getElementById("removeButtonsButton").addEventListener("click", function () {
  // Send a message to the content script to remove buttons
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    browser.tabs.sendMessage(activeTab.id, { action: "removeButtons" }, function (response) {
      // Handle the response if needed
    });
  });
});
