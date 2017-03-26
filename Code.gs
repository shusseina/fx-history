//
// Code.gs
// https://github.com/shusseina/fx-history
//
// Google Apps Script. Converts values in the format days hours minutes seconds
// (e.g. 1d 2h 3m 5s) to a minute value.
//
// Copyright (C) 2017 Steve Anderson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

function convertTradeDuration() {

  // Logger.clear();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // var sheet = spreadsheet.getSheets()[0];

  // From the Google Apps Script reference...
  // If multiple sheets have the same name, the leftmost one is returned.
  var sheet = spreadsheet.getSheetByName('History');

  // Validate sheet
  if (sheet === null) {
    Browser.msgBox('Convert Trade Duration',
    'Did not complete. Could not find the History worksheet (case-sensitive).',
    Browser.Buttons.OK);
    return;
  }

  // Prompt user for a range
  var selectedRange = Browser.inputBox('Convert Trade Duration',
    'Please enter a source range (e.g. A1:A10) :',
    Browser.Buttons.OK_CANCEL);

  if (selectedRange == 'cancel') {
    return;
  }

  var range = sheet.getRange(selectedRange);
  // No need to validate the range, Google Sheets handles that for us

  var values = range.getValues();

  // var start = new Date();

  var returnVal = convertToMinutes_(values);

  // Assume returnVal is an Array ???
  var results = new Array();
  for (var m = 0; m < returnVal.length; m++) {
    results.push([returnVal[m]]);
  }

  sheet.getRange(range.getRow(), range.getColumn(), results.length, 1).setValues(results);

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
  var secondsAsMinutes = 0;

  daysAsMinutes = getDaysAsMinutes_(input);
  hoursAsMinutes = getHoursAsMinutes_(input);
  minutes = getMinutes_(input);
  secondsAsMinutes = getSecondsAsMinutes_(input);

  return daysAsMinutes + hoursAsMinutes + minutes + secondsAsMinutes;
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

function getSecondsAsMinutes_(durationString) {

  return asMinutes_(durationString, /\d*s/, /s/, (1/60));
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
    // {name: 'Generate Random Duration Strings', functionName: 'generateRandomDurationStrings'},
    // {name: 'Convert Random Duration Values', functionName: 'convertRandomDurationValues'}
  ];
  spreadsheet.addMenu('Macros', menuItems);
}
