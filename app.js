// Dain Wiseman | 10/09/2025


window.onload = function () {
  // Grab elements
  var palForm  = document.getElementById("palForm");
  var palInput = document.getElementById("palInput");
  var result   = document.getElementById("result");
  var loopForm = document.getElementById("loopForm");
  var doneMsg  = document.getElementById("doneMsg");

  
  if (!palForm || !palInput || !result || !loopForm || !doneMsg) {
    if (result) result.innerHTML = "Setup error: check IDs and that app.js/style.css are in the same folder.";
    return;
  }

  // Main palindrome check 
  palForm.onsubmit = function (e) {
    
    e.preventDefault();

    
    var raw = String(palInput.value || "").trim();
    if (raw.length === 0) {
      result.innerHTML = "Please enter a non-empty word or phrase.";
      palInput.focus();
      return false;
    }

    // Remove spaces and ignore case
    var cleaned  = raw.replace(/ /g, "").toLowerCase();

    // Reverse and compare
    var reversed = cleaned.split("").reverse().join("");
    var isPal    = cleaned === reversed;

    result.innerHTML = isPal
      ? "<strong>" + escapeHtml(raw) + "</strong> is a palindrome."
      : "<strong>" + escapeHtml(raw) + "</strong> is not a palindrome.";

    // Keep text selected for quick retyping
    palInput.select();
    return false;
  };

  // Loop control
  loopForm.onsubmit = function (e) {
    e.preventDefault();

    // Which button was pressed?
    var data = new FormData(loopForm);
    var choice = data.get("choice");

    if (choice === "again") {
      
      palInput.value = "";
      result.innerHTML = "";
      doneMsg.innerHTML = "";
      palInput.focus();
    } else if (choice === "done") {
      // Exit the loop
      palForm.classList.add("hidden");
      loopForm.classList.add("hidden");
      doneMsg.innerHTML = "Thanks for using the Palindrome Checker! Take your screenshots now.";
    }
    return false;
  };
};


function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}