
// Creates randomNumber field that holds the number that has to be guessed (range changes due to difficulty)
var randomNumber;
// Creates difficulty field to output (via HTML5 element) the difficulty number
var difficulty = document.getElementById("difficulty");
// Sets the difficulty chosen from the user and sends data to HTML5
var setDifficulty = document.getElementById("setDifficulty");

// Sends reference to the Enter Guess button
var guessSubmit = document.getElementById("guessSubmit");
// Sends reference to the blank input space for the guess
var guessField = document.getElementById("guessField");

// Sends reference to the Go Again button
var again = document.getElementById("again");

// Sends reference to the flip button from the Hint field in order to check if it is On or Off
var flip = document.getElementById("flip");

// Creates hint field to output (via HTML5 element) the hint details
var hint = document.getElementById("hint");

// Creates the guessCount field to hold a count of the tries required
var guessCount = 1;

// Function to allow the player set the difficulty of the game
function setDifficultyF()
{
 // Switch case between 1, 2, 3 or any other input
switch(Number(difficultyField.value))
 {
    // In case of 1, then the game is set to difficulty 1, randomNumber takes value between 1 and 10
    case 1:
        randomNumber = Math.floor(Math.random() * 10) + 1;
        difficulty.innerHTML = "Difficulty: " + difficultyField.value;
        difficultyField.value = "";
        break;
    // In case of 2, then the game is set to difficulty 2, randomNumber takes value between 1 and 100
    case 2:
        randomNumber = Math.floor(Math.random() * 100) + 1;
        difficulty.innerHTML = "Difficulty: " + difficultyField.value;
        difficultyField.value = "";
        break;
    // In case of 3, then the game is set to difficulty 3, randomNumber takes value between 1 and 1000
    case 3:
        randomNumber = Math.floor(Math.random() * 1000) + 1;
        difficulty.innerHTML = "Difficulty: " + difficultyField.value;
        difficultyField.value = "";
        break;
    // In case of another value entered, the game will output a message asking the player to choose a valid difficulty
    default:
        difficulty.innerHTML = "Please choose a valid difficulty!";
        difficultyField.value = "";
        break;
 } 
}

// Function that reads the number given by the player and checks if it matches
function checkGuess() 
{
  // Reads the input and attributes the value to userGuess
  var userGuess = Number(guessField.value);
  
  // If the player has reached the limit of guesses, the game ends
  if(guessCount == 8) 
  {
    lastResult.innerHTML = "You haven't guessed it in 8 tries. The number was " + randomNumber;
    // Long vibration to tell the player he's wrong
    navigator.vibrate(1000);
    // Disables input blank and Enter Guess button so the player can continue only on Go Again button
    disableForm();
  } 
  else 
  {
    // If the player has guessed the correct number, the game outputs the appropiate message plus the number of tries required
    if(userGuess == randomNumber) 
    {
      lastResult.innerHTML = "Congratulations! You got it right! " + guessCount + " tries required.";
      // Disables input blank and Enter Guess button so the player can continue only on Go Again button
      disableForm();
      // Hint output takes no value
      hint.innerHTML = "";
      // Difficutly output takes no value
      difficulty.innerHTML = "";
      // Vibrates 3 times each 0.3 seconds as a victory vibration
      navigator.vibrate([500, 300, 500, 300, 500]);
      
    } 
    else 
    {
      // Output the result from the wrong guess
      lastResult.innerHTML = "The number is wrong. Try again.";
      // If the user's number is lower than random number and hints are on, appropiate message is outputed
      if((userGuess < randomNumber) && (flip.value == "On"))
      {
        hint.innerHTML = "Your guess is too low!";
      } 
       // If the user's number is higher than random number and hints are on, appropiate message is outputed
      else if((userGuess > randomNumber) && (flip.value == "On")) 
      {
        hint.innerHTML = "Your guess is too high!";
      }
      // Long vibration to tell the player he's wrong
      navigator.vibrate(1000);
    }
    // Guess count raises with one
    guessCount++;
    // The blank space will delete the last input so it remains blank
    guessField.value = "";
  }
}

// Go Again function, triggered only if the Go Again button is being pressed
function goAgain()
{
  // Enables again all the functions
  enableForm();
  // Empties the outputs so the game is being resetted
  hint.innerHTML = "";
  lastResult.innerHTML = "";
  // Asks for choosing a difficulty so the player can start the game
  difficulty.innerHTML = "Please choose a difficulty!";
  // Calls the difficulty set function
  setDifficultyF();
  // Reset the number of guesses required
  guessCount = 1;
}

// Function to disable the blank input space and Enter Guess button, also changing the opacity to lower
function disableForm() 
{
  var wholeForm = document.querySelector(".form");
  wholeForm.style.opacity = 0.5;
  guessField.setAttribute("disabled", "disabled");
  guessSubmit.setAttribute("disabled", "disabled");
}

// Function to enable the blank input space and Enter Guess button, also changing the opacity to normal
function enableForm()
{
  var wholeForm = document.querySelector(".form");
  wholeForm.style.opacity = 1;
  guessField.removeAttribute("disabled", "disabled");
  guessSubmit.removeAttribute("disabled", "disabled");
}

// Reads the buttons being pressed.
setDifficulty.onclick = setDifficultyF;
guessSubmit.onclick = checkGuess;
again.onclick = goAgain;
