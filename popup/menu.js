/*
Listen for clicks in the popup.

If the click is not on one of the options, return early.

Otherwise, the text content of the node is the name of option.

Inject the "clean-read.js" content script in the active tab.

Then get the active tab and send "clean-read.js" a message
containing the opt.
*/
document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("option")) {
      //console.log('got click on option');

    return;
  }

  var choice = e.target.textContent;
  //console.log(choice)
  chrome.tabs.executeScript(null, {
    file: "/content_scripts/clean-read.js"
  });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {opt: choice});
  });

});