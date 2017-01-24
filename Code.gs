function convertTradeDuration() {

  // Logger.clear();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[0];

  // Prompt user for a range
  var selectedRange = Browser.inputBox('Convert Trade Duration',
    'Please enter a source range (e.g. A1:A10) :',
    Browser.Buttons.OK_CANCEL);

  if (selectedRange == 'cancel') {
    return;
  }

  // Validate the selectedRange ???

  // Prompt user for a column to write the results to
  var selectedColumn = Browser.inputBox('Convert Trade Duration',
    'Please enter a target column for the results (e.g. B) :',
    Browser.Buttons.OK_CANCEL);

  if (selectedColumn == 'cancel') {
    return;
  }

  // Validate selectedColumn ???

  var resultsColumn = sheet.getRange(selectedColumn + "1").getColumn();

  var range = sheet.getRange(selectedRange);
  var values = range.getValues();

  // var start = new Date();

  var returnVal = convertToMinutes_(values);

  // Assume returnVal is an Array ???
  var results = new Array();
  for (var m = 0; m < returnVal.length; m++) {
    results.push([returnVal[m]]);
  }

  sheet.getRange(range.getRow(), resultsColumn, results.length, 1).setValues(results);

  // var finish = new Date();

  // Logger.log("start = " + start);
  // Logger.log("finish = " + finish);
  // Logger.log("lapsed time = " + ((finish - start)/1000.0) + "seconds");
  return;
}

function convertToMinutes_(input) {

//  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//  var sheet = spreadsheet.getSheets()[0];
//  var range = sheet.getRange("G1:G4");
//  input = range.getValues();

  if (input.map) {
    return input.map(convertToMinutes_);
  }

  // else...
  var daysAsMinutes = 0;
  var hoursAsMinutes = 0;
  var minutes = 0;

  daysAsMinutes = getDaysAsMinutes_(input);
  hoursAsMinutes = getHoursAsMinutes_(input);
  minutes = getMinutes_(input);

  return daysAsMinutes + hoursAsMinutes + minutes;
}

function getDaysAsMinutes_(durationString) {

  return asMinutes_(durationString, /\d*d/, /d/, 24 * 60);
}

function getHoursAsMinutes_(durationString) {

  return asMinutes_(durationString, /\d*h/, /h/, 60);
}

function getMinutes_(durationString) {

  return asMinutes_(durationString, /\d*m/, /m/, 1);
}

function asMinutes_(durationString, regex, regex2, multiplyingFactor) {

  var char;
  var minutes = NaN;

  var index = durationString.search(regex);
  // Logger.log("index = " + index);

  if (index == -1) {
    return 0;
  }

  var durationString2 = durationString.substring(index);
  var index2 = durationString2.search(regex2);
  var valueString = "";

  valueString = durationString2.substring(0, index2);
  // Logger.log("valueString = " + valueString);
  value = parseInt(valueString, 10);

  if (isNaN(value)) {
    // What should I do?
    // Logger.log("value is NaN");
    return NaN;
  }

  minutes = value * multiplyingFactor;

  // Logger.log("minutes = " + minutes);
  return minutes;
}

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Convert Trade Duration', functionName: 'convertTradeDuration'},
//    {name: 'Generate Random Duration Strings', functionName: 'generateRandomDurationStrings'},
//    {name: 'Convert Random Duration Values', functionName: 'convertRandomDurationValues'}
  ];
  spreadsheet.addMenu('Macros', menuItems);
}
