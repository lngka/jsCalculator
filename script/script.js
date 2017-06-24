var topDisplay = document.getElementById("topDisplay");
var botDisplay = document.getElementById("botDisplay");
var mathExpression = "";
var reset = true;

function newInput(input){
  if (reset)
    clear();

  switch (input) {
    case "C":
      clear();
      break;
    case "CE":
      clearEntry();
      break;
    case "=":
      solve();
      break;
    case "sqrt":
      sqrt(input);
      break;
    default:
      update(input);
  }
}

function update(input){
  topDisplay.value += input;
  mathExpression += input;
}

function sqrt(input){
  topDisplay.value += "^2";
  mathExpression += "^2";
}

function clear(){
  topDisplay.value = "";
  botDisplay.value = "";
  reset = false;
}

function clearEntry(){
    topDisplay.value = topDisplay.value.slice(0, -1);
}

function solve(){

  if (reset) {
    clear();
  }

  parseMathExpression();
  var result = eval(mathExpression);
  mathExpression = "";


  if (result === undefined)
    botDisplay.value = "Syntax Error";
  else
    botDisplay.value = result;
  reset = true;
}

function parseMathExpression(){
  console.log("parsing================================");
  var sqrtPattern = /(\d+(\.\d+)?)(\^2)/g;
  mathExpression = mathExpression.replace(sqrtPattern, function(match, p1, p2, p3){
    console.log("Original mathExpression " + mathExpression);
    console.log("match " + match);
    console.log("num " + p1);
    return p1 + "*" + p1;
  });
  console.log("parsed " + mathExpression);
}
