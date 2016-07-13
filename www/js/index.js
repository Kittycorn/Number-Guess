
var difficulty;
var randomNumber;
var difficulty = document.getElementById("difficulty");
var setDifficulty = document.getElementById("setDifficulty");

var guessSubmit = document.getElementById("guessSubmit");
var guessField = document.getElementById("guessField");

var again = document.getElementById("again");

var flip = document.getElementById("flip");

var hint = document.getElementById("hint");
var guessCount = 1;

function setDifficultyF()
{
switch(Number(difficultyField.value))
 {
    case 1:
        randomNumber = Math.floor(Math.random() * 10) + 1;
        difficulty.innerHTML = "Difficulty: " + difficultyField.value;
        difficultyField.value = "";
        break;
    case 2:
        randomNumber = Math.floor(Math.random() * 100) + 1;
        difficulty.innerHTML = "Difficulty: " + difficultyField.value;
        difficultyField.value = "";
        break;
    case 3:
        randomNumber = Math.floor(Math.random() * 1000) + 1;
        difficulty.innerHTML = "Difficulty: " + difficultyField.value;
        difficultyField.value = "";
        break;
    default:
        difficulty.innerHTML = "Please choose a valid difficulty!";
        difficultyField.value = "";
        break;
 } 
}

function checkGuess() 
{
  var userGuess = Number(guessField.value);
  if(guessCount == 8) 
  {
    lastResult.innerHTML = "You haven't guessed it in 8 tries. The number was " + randomNumber;
 navigator.vibrate(1000);
    disableForm();
  } 
  else 
  {
    
    if(userGuess == randomNumber) 
    {
      lastResult.innerHTML = "Congratulations! You got it right! " + guessCount + " tries required.";
      disableForm();
      hint.innerHTML = "";
      difficulty.innerHTML = "";
      navigator.vibrate(500);
      navigator.vibrate(500);
      navigator.vibrate(500);
      
    } 
    else 
    {
      lastResult.innerHTML = "The number is wrong. Try again.";
      if((userGuess < randomNumber) && (flip.value == "On"))
      {
        hint.innerHTML = "Your guess is too low!";
  navigator.vibrate(1000);
      } 
      else if((userGuess > randomNumber) && (flip.value == "On")) 
      {
        hint.innerHTML = "Your guess is too high!";
  navigator.vibrate(1000);
      }
    }
    guessCount++;
    guessField.value = "";
  }
}
function goAgain()
{
  enableForm();
  hint.innerHTML = "";
  lastResult.innerHTML = "";
  difficulty.innerHTML = "Please choose a difficulty!";
  setDifficultyF();
  guessCount = 1;
}
function playSound(soundfile) 
{
 document.getElementById("sound").innerHTML = "<embed src='"+soundfile+"' hidden='true' autostart='true' loop='false' />";
}
function disableForm() 
{
  var wholeForm = document.querySelector(".form");
  wholeForm.style.opacity = 0.5;
  guessField.setAttribute("disabled", "disabled");
  guessSubmit.setAttribute("disabled", "disabled");
}
function enableForm()
{
  var wholeForm = document.querySelector(".form");
  wholeForm.style.opacity = 1;
  guessField.removeAttribute("disabled", "disabled");
  guessSubmit.removeAttribute("disabled", "disabled");
}
setDifficulty.onclick = setDifficultyF;
guessSubmit.onclick = checkGuess;
again.onclick = goAgain;
