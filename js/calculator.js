var first = document.getElementById("first"),
    second = document.getElementById("second"),
    sign = document.getElementById("sign");

first.oninput = function(){
  count();
}

second.oninput = function(){
  count();
}

sign.oninput = function(){
  count();
}

function count() {
  var firstValue =  parseStringToInteger(first.value),
      secondValue = parseStringToInteger(second.value),
      signValue = sign.value,
      result = 0;

  if (signValue == "/" && secondValue == 0) {
    alert("На ноль делить нельзя");
    return;
  }

  result = getResult(firstValue, secondValue, signValue);
  document.getElementById("result").innerHTML = result;
  // addToStory(first, second, sign, result);
};

function parseStringToInteger(string) {
  var integer = parseInt(string, 10);

  if(isNaN(integer)){
    return 0;
  } else {
    return integer;
  }
};

function getResult(first, second, sign) {
  var result = 0;

  switch (sign) {
    case "+":
      result = first + second;
      break;
    case "−":
      result = first - second;
      break;
    case '×':
      result = first * second;
      break;
    default:
      result = first / second;
  }

  return addDelimer(result);
};

function addToStory(first, second, sign, result) {
  var newStory = addDelimer(first) + " " + sign + " " + addDelimer(second) + " = " + result + "<br>",
      story = document.getElementById("result-story").innerHTML;

  story = newStory + story;
  document.getElementById("result-story").innerHTML = story;
}

function addDelimer(number) {
  var isNegative = number < 0;

  if(isNegative){
    number = number * -1;
  }

  if (number < 1000) {
    return isNegative ? '−' + number : number;
  }

  if (number < 1000000) {
    var units = number % 1000,
        thousands = (number - units) / 1000;

    string = thousands + addZeros(units);
    return isNegative ? '−' + string : string;
  }

  if (number < 1000000000) {
    var units = number % 1000,
        thousandsMore = (number - units) / 1000,
        thousands = thousandsMore % 1000,
        millions = (thousandsMore - thousands) / 1000;

    string = millions + addZeros(thousands) + addZeros(units);
    return isNegative ? '−' + string : string;
  }

  var units = number % 1000,
      thousandsMore = (number - units) / 1000,
      thousands = thousandsMore % 1000,
      millionsMore = (thousandsMore - thousands) / 1000,
      millions = millionsMore % 1000,
      billions = (millionsMore - millions) / 1000;

  string = billions + addZeros(millions) + addZeros(thousands) + addZeros(units);
  return isNegative ? '−' + string : string;
}

function addZeros(number) {
  if(number == 0) {
    return " 000";
  }
  if(number < 10) {
    return " 00" + number;
  }
  if(number < 100) {
    return " 0" + number;
  }
  return ' ' + number;
}
