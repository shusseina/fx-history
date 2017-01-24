function generateRandomDurationStrings() {

  // Logger.clear();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];

  // Prompt user for a range
  var selectedRange = Browser.inputBox('Generate Random Duration Strings',
    'Please enter a target range (e.g. A1:A10) :',
    Browser.Buttons.OK_CANCEL);

  if (selectedRange == 'cancel') {
    return;
  }

  var range = sheet.getRange(selectedRange);
  var resultsColumn = range.getColumn();
  var values = range.getValues();

  var returnVal = generateRandomDurationStrings_(values);

  // Assume returnVal is an Array ???
  var results = new Array();
  for (var m = 0; m < returnVal.length; m++) {
    results.push([returnVal[m]]);
  }

  sheet.getRange(range.getRow(), resultsColumn, results.length, 1).setValues(results);
  return;
}

function generateRandomDurationStrings_(input) {

  if (input.map) {
    return input.map(generateRandomDurationStrings_);
  }

  // else...
  var randomChoice = Math.floor(Math.random() * (7 + 1 - 1)) + 1;
  switch (randomChoice) {
    case 1:
      return randomDaysString_() + " " + randomHoursString_() + " " + randomMinutesString_();
    case 2:
      return randomDaysString_() + " " + randomHoursString_();
    case 3:
      return randomDaysString_() + " " + randomMinutesString_();
    case 4:
      return randomHoursString_() + " " + randomMinutesString_();
    case 5:
      return randomDaysString_();
    case 6:
      return randomHoursString_();
    case 7:
      return randomMinutesString_();
  }
}

function randomDaysString_() {

  var days = Math.floor(Math.random() * (31 + 1 - 1)) + 1;
  return days.toString() + "d";
}

function randomHoursString_() {

  var hours = Math.floor(Math.random() * (23 + 1 - 1)) + 1;
  return hours.toString() + "h";
}

function randomMinutesString_() {

  var minutes = Math.floor(Math.random() * (59 + 1 - 1)) + 1;
  return minutes.toString() + "m";
}

function convertRandomDurationValues() {

  // Logger.clear();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];

  // Prompt user for a range
  var selectedRange = Browser.inputBox('Convert Random Duration Values',
    'Please enter a source range (e.g. A1:A10) :',
    Browser.Buttons.OK_CANCEL);

  if (selectedRange == 'cancel') {
    return;
  }

  // Validate the selectedRange ???

  // Prompt user for a column to write the results to
  var selectedColumn = Browser.inputBox('Convert Random Duration Values',
    'Please enter a target column for the results (e.g. B) :',
    Browser.Buttons.OK_CANCEL);

  if (selectedColumn == 'cancel') {
    return;
  }

  // Validate selectedColumn ???

  var resultsColumn = sheet.getRange(selectedColumn + "1").getColumn();
  var range = sheet.getRange(selectedRange);
  var values = range.getValues();

  var returnVal = convertRandomDurationValues_(values);

  // Assume returnVal is an Array ???
  var results = new Array();
  for (var m = 0; m < returnVal.length; m++) {
    results.push([returnVal[m]]);
  }

  sheet.getRange(range.getRow(), resultsColumn, results.length, 1).setValues(results);
  return;
}

function convertRandomDurationValues_(input) {

  if (input.map) {
    return input.map(convertRandomDurationValues_);
  }

  // else...
  var days = Math.floor(input / (60 * 24));
  var hours = Math.floor((input - (days * 60 * 24)) / 60);
  var minutes = Math.floor(input - (days * 60 * 24) - (hours * 60));

  var durationString = "";

  if (days > 0 ) {
    durationString = durationString + days.toString() + "d ";
  }

  if (hours > 0) {
    durationString = durationString + hours.toString() + "h ";
  }

  if (minutes > 0) {
      durationString = durationString + minutes.toString() + "m";
  }

  return durationString.trim();
}
