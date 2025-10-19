// Dain Wiseman | 10/18/2025


// Create a class to hold string data
class WordAnalyzer {
    constructor(word) {
        // Convert word to lowercase
        this.word = word.toLowerCase();
    }

    // check if the word is a palindrome
    isPalindrome() {
        // Reverse the string and compare
        let reversed = this.word.split("").reverse().join("");
        return this.word === reversed;
    }

    // count vowels
    countVowels() {
        let count = 0;
        const vowels = "aeiou";
        for (let i = 0; i < this.word.length; i++) {
            if (vowels.includes(this.word[i])) {
                count++;
            }
        }
        return count;
    }
}

// handlesform submission
function handleFormSubmit(event) {
    // Prevent form from refreshing the page
    event.preventDefault();

    // Get user input and trim extra spaces
    let input = document.getElementById("userWord").value.trim();

    // Validate input 
    if (input.length === 0) {
        document.getElementById("result").innerHTML = "Please enter a valid word.";
        return;
    }

    // Create a new WordAnalyzer object
    let analyzer = new WordAnalyzer(input);

    // Decision logic (if/else)
    let message = `<strong>Word:</strong> ${input}<br>`;
    message += `Vowel Count: ${analyzer.countVowels()}<br>`;

    if (analyzer.isPalindrome()) {
        message += "This word is a palindrome!";
    } else {
        message += "This word is not a palindrome.";
    }

    // Display message on the page
    document.getElementById("result").innerHTML = message;
}

// Connect the form submission
document.getElementById("wordForm").onsubmit = handleFormSubmit;