//This targets the unordered list of guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
//This targets the button with the word Guess in it
const guessButton = document.querySelector(".guess");
//This targets the input where the player guesses a letter
const letterInput = document.querySelector(".letter");
//This targets the paragraph where the word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
//This targets the paragraph where remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
//This targets the span inside paragraph where remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//This targets the paragraph where messages appear when player guesses a letter
const message = document.querySelector(".message");
//This targets the hidden play again button
const playAgainButton = document.querySelector(".play-again");

//This is the starting word to test out game until words fetched from API
let word = "magnolia";
//This is a global variable for the player's guesses
const guessedLetters = [];
//This is a global variable for the number of guesses
let remainingGuesses = 8;

//Create an async function
const getWord = async function() {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log(words);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

//Display circle symbols as placeholders for chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for(const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//placeholder(word);

//Add Event Listener for when player clicks Guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    //console.log(guess);
    letterInput.value = "";
    //Empty the message paragraph text
    message.innerText = "";
    //Let's make sure it is a single letter
    const goodGuess = validateInput(guess);
    //console.log(goodGuess);
    //It's a letter so make a guess
    if(goodGuess){
        makeGuess(guess);
    }
});

//Create Function to check player's input
const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    //Is input empty?
    if(input.length === 0) {message.innerText = "Please enter a letter.";}
    //Did player type more than one letter?
    else if(input.length > 1) {message.innerText = "Please enter a single letter.";}
    //Did player type non-letter such as number or special character?
    else if(!input.match(acceptedLetter)) {message.innerText = "Please enter a letter from A to Z.";}
    //Did the player type a single letter?
    else {return input;}
};

//Create Function to capture players's input
const makeGuess = function(guess) {
    guess = guess.toUpperCase();

    if(guessedLetters.includes(guess)) {
        message.innerText = "Sorry, you already guessed that letter. Try again.";
    }
    else {guessedLetters.push(guess);
    console.log(guessedLetters);
    //Call functions
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
    }
};

//Create Function to display guessed letters
const showGuessedLetters = function () {
    //Clear the unordered list
    guessedLettersElement.innerHTML = "";
    //Create list item for every letter loop through array
    for(const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

//Create Function to update word in progress
const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    //console.log(wordUpper);
    //Split the word string into array elements
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    //Create new array where letters or circles will be pushed to
    const revealWord = [];
    for(const letter of wordArray) {
        if(guessedLetters.includes(letter)){
        revealWord.push(letter.toUpperCase());
        }
        else {revealWord.push("●");}      
    }
    //Update empty paragraph of the word & join to make it a string again
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

//Create Function to count remaining guesses
const updateGuessesRemaining = function(guess) {
    //Create another variable for the word that needs to be uppercase
    const upperWord = word.toUpperCase();

    //Update message based on guess and subtract one guess if it's incorrect
    if(!upperWord.includes(guess)) {message.innerText = `Sorry, the word does not have the letter ${guess}.`;
    remainingGuesses -= 1;}
    else {message.innerText = `Good guess! The word has the letter ${guess}!`;}
    
    //Update remaining guesses paragraph based on number of guesses left
    if(remainingGuesses === 0) {message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`}
    else if(remainingGuesses === 1) {remainingGuessesSpan.innerText = `${remainingGuesses} guess`}
    else {remainingGuessesSpan.innerText = `${remainingGuesses} guesses`}
}; 

//Create Function to check if the player won
const checkIfWin = function () {
    if(word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");    
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`; 
    }
};