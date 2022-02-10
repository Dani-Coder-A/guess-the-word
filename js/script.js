//This targets the unordered list of guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
//This targets the button with the word Guess in it
const guessButton = document.querySelector(".guess");
//This targets the input where the player guesses a letter
const letterInput = document.querySelector(".letter");
//This targets the paragraph where the word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
//This targets the paragraph where remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
//This targets the span inside paragraph where remaining guesses will display
const remainingGuessesSpan = document.querySelector("span");
//This targets the paragraph where messages appear when player guesses a letter
const message = document.querySelector(".message");
//This targets the hidden play again button
const playAgainButton = document.querySelector(".play-again");

//This is the starting word to test out game until words fetched from API
const word = "magnolia";

//Display circle symbols as placeholders for chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for(const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//Add Event Listener for when player clicks Guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});
