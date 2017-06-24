var topDisplay = document.getElementById("topDisplay");
var botDisplay = document.getElementById("botDisplay");
var mathExpression = "";
var reset = true;
var result = undefined;

function newInput(input){
  if (reset)
    clear();

  switch (input) {
    case "C":
      result = undefined;
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
  console.log(result);
  // auto add 0 before comma if needed for decimal number
  if (input === "." && (isNaN(topDisplay.value.charAt(topDisplay.value.length - 1)) || topDisplay.value == "")) {
    topDisplay.value += "0" + ".";
    mathExpression += "0" + ".";
  }
  // enable chaining last result to new expression
  else if (input.search(/[-+*/]/) == 0 && result !== undefined) {
    topDisplay.value += result + input;
    mathExpression += result + input;
  }

  else if (topDisplay.value.slice(-2) === "^2" && input.search(/[-+*/]/) !== 0){
    // do nothing, accept only operator after squared symbol ^2
  }
  else {
    result = undefined;
    topDisplay.value += input;
    mathExpression += input;
  }
}

function sqrt(input){
  if (topDisplay.value.slice(-2) === "^2" || topDisplay.value == "") {
    // do nothing, chaining ^2 not allowed
    // starting with ^2 not allowed
  }
  else {
    topDisplay.value += "^2";
    mathExpression += "^2";
  }
}

function clear(){
  topDisplay.value = "";
  botDisplay.value = "";
  reset = false;
}

function clearEntry(){
  // clear 2 chars if last chars are squared symbol ^2
  if (topDisplay.value.slice(-2) === "^2") {
    topDisplay.value = topDisplay.value.slice(0, -2);
  }
  else // clear 1 char
    topDisplay.value = topDisplay.value.slice(0, -1);
}

function solve(){

  if (reset) {
    clear();
  }

  parseMathExpression();
  result = eval(mathExpression);
  mathExpression = "";


  if (result === undefined)
    botDisplay.value = "life's good, go get one";
  else
    botDisplay.value = result;
  reset = true;
}

// look for patterns like "number^2" in mathExpression
// change that to "number*number"
// this enable evaluation of squared expression with eval()
function parseMathExpression(){
  var sqrtPattern = /(\d+(\.\d+)?)(\^2)/g;
  mathExpression = mathExpression.replace(sqrtPattern, function(match, p1, p2, p3){
    return p1 + "*" + p1;
  });
}
