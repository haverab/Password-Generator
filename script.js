// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector('#password')

//Added event listener
generateBtn.addEventListener('click', generatePassword);

//Each type of character (uppercase, lowercase, numebers, special) available in different arrays
var allLowChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
var allUpChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var allNums = '0123456789'.split('');
var allSpcChars = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');

// // Prompt the user for their preferred password length and then validate their response
function generatePassword() {
  var numChars = prompt(
    'Hello! How many characters would you like in your password (Please enter a number between 8 and 128)'
  );
  // enable the user to cancel if they wish
  if (numChars === null) return;

  // coerce NaN if input is a text string that cannot be coerced to a number
  numChars = parseInt(numChars);
  // validate input
  while (isNaN(numChars) || numChars < 8 || numChars > 128) {
    if (numChars === null) return;
    numChars = prompt('Invalid entry, please enter a NUMBER between 8 and 128');
  }

  selectChars(numChars);
}

// Prompt the use of each character types the user can use - instruct to click the ok button for yes and the cancel button for no
function selectChars(numChars) {
  var lowCase = confirm(
    'Would you like to include LOWERCASE characters in password? (Click OK for YES or CANCEL for NO)'
  );
  var upCase = confirm(
    'Would you like to include UPPERCASE characters in password? (Click OK for YES or CANCEL for NO)'
  );
  var nums = confirm(
    'Would you like to include NUMBERS in your password? (Click OK for YES or CANCEL for NO)'
  );
  var specials = confirm(
    'Would you like to include SPECIAL CHARACTERS in your password? (Click OK for YES or CANCEL for NO)'
  );
  // The users needs to choose at least one character type. If not, prompt them to choose one
  if (lowCase === false && upCase === false && nums === false && specials === false) {
    alert('You must choose at least one type of character to use for your password');
    lowCase = confirm(
      'Would you like to include LOWERCASE characters in password? (Click OK for YES or CANCEL for NO)'
    );
    upCase = confirm(
      'Would you like to include UPPERCASE characters in password? (Click OK for YES or CANCEL for NO)'
    );
    nums = confirm(
      'Would you like to include NUMBERS in your password? (Click OK for YES or CANCEL for NO)'
    );
    specials = confirm(
      'Would you like to include SPECIAL CHARACTERS in your password? (Click OK for YES or CANCEL for NO)'
    );
  }

  // build object for criteria config
  var criteria = {
    numChars: numChars,
    lowCase: lowCase,
    upCase: upCase,
    nums: nums,
    specials: specials
  };

  createPassword(criteria);
}

// loop over all the character types until the user's password length has been fullfilled  
// CALL SUBROUTINE TO GENERATE RANDO INDEX IN CHAR SET TO PUSH TO PW ARRAY
function createPassword(criteria) {
  var passwordArr = [];
  while (passwordArr.length < criteria.numChars) {
    if (criteria.lowCase) {
      passwordArr.push(allLowChars[genRanIdx(allLowChars)]);
    }
    if (criteria.upCase) {
      passwordArr.push(allUpChars[genRanIdx(allUpChars)]);
    }
    if (criteria.nums) {
      passwordArr.push(allNums[genRanIdx(allNums)]);
    }
    if (criteria.specials) {
      passwordArr.push(allSpcChars[genRanIdx(allSpcChars)]);
    }
  }
  var passWordStr = passwordArr.join('');
  writePassword(passWordStr);
}

// Generate random index from the different character sets
function genRanIdx(charSet) {
  return Math.floor(Math.random() * charSet.length);
}


// Write password to the #password input
function writePassword(password) {
  passwordText.value = password;

}


