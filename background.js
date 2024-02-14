browser.webNavigation.onCompleted.addListener(function (details) {
  // Check if the URL matches your criteria (you can modify this condition)
  if (details.url.includes("grades" && "uic.blackboard.com")) {
    // Inject the content script into the tab
    browser.tabs.executeScript(details.tabId, { file: "content.js" }, function () {
      // After injecting the content script, send a message to check ID
      browser.tabs.sendMessage(details.tabId, { action: "gradeRevamp" });
    });
  }
  
  if (details.url === "https://uic.blackboard.com/") {
    browser.tabs.executeScript(details.tabId, { file: "content.js" }, function () {
      browser.tabs.sendMessage(details.tabId, { action: "autoLoginBB" });
    });
  }

  if (details.url.includes("login.microsoftonline.com")) {
    browser.tabs.executeScript(details.tabId, { file: "content.js" }, function () {
      browser.tabs.sendMessage(details.tabId, { action: "autoLoginMicrosoft" });
    });
  }

  if (details.url.includes("sts.uic.edu")) {
    browser.tabs.executeScript(details.tabId, { file: "content.js" }, function () {
      browser.tabs.sendMessage(details.tabId, { action: "autoLoginUIC" });
    });
  }



});

