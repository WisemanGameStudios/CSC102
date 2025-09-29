// strings.js
// Author: Dain Wiseman


const form = document.getElementById("gateForm");
const validationBox = document.getElementById("validation");
const palBox = document.getElementById("palResult");
const secretBox = document.getElementById("secret");


form.onsubmit = function (evt) {

  evt.preventDefault();

  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const zip = document.getElementById("zip").value.trim();

  
  const fullName = `${first} ${last}`.trim();

  validationBox.innerHTML = "";
  palBox.innerHTML = "";
  palBox.style.display = "none";
  secretBox.innerHTML = "";
  secretBox.style.display = "none";

  const errors = [];

  
  if (!first || !last) {
    errors.push("Please enter both your first and last names.");
  }

 
  if (fullName.length > 20) {
    errors.push(
      `Your full name (“${fullName}”) is ${fullName.length} characters. It must be 20 or fewer.`
    );
  }

  
  const zipOK = /^\d{5}$/.test(zip);
  if (!zipOK) {
    errors.push("ZIP must be exactly 5 digits (e.g., 85001).");
  }

  if (errors.length > 0) {
    
    validationBox.innerHTML = `
      <div class="error">
        <strong>Please fix the following:</strong>
        <ul>${errors.map((e) => `<li>${e}</li>`).join("")}</ul>
      </div>`;
    return;
  }

  
  validationBox.innerHTML = `
    <div class="success">
      All set, ${fullName}! Decrypting top-secret information now...
    </div>`;
 
  secretBox.style.display = "block";
  secretBox.innerHTML = `
    SECRET: “"However difficult life may seem, there is always something you can do and succeed at" - Stephen Hawking”<br />
    Thanks for verifying, ${fullName} from ${zip}.
  `;
};