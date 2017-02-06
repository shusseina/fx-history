//
// Test.gs
// https://github.com/shusseina/fx-history
//
// Google Apps Script. For testing of Code.gs.
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
  var randomChoice = Math.floor(Math.random() * (15 + 1 - 1)) + 1;
  switch (randomChoice) {
    // DHMS
    case 1:
      return randomDaysString_() + " " + randomHoursString_() + " " + randomMinutesString_() + " " + randomSecondsString_();
    // DHM
    case 2:
      return randomDaysString_() + " " + randomHoursString_() + " " + randomMinutesString_();
    // DHS
    case 3:
      return randomDaysString_() + " " + randomHoursString_() + " " + randomSecondsString_();
    // DMS
    case 4:
      return randomDaysString_() + " " + randomMinutesString_() + " " + randomSecondsString_();
    // DH
    case 5:
      return randomDaysString_() + " " + randomHoursString_();
    // DM
    case 6:
      return randomDaysString_() + " " + randomMinutesString_();
    // DS
    case 7:
      return randomDaysString_() + " " + randomSecondsString_();
    // D
    case 8:
      return randomDaysString_();
    // HMS
    case 9:
      return randomHoursString_() + " " + randomMinutesString_() + " " + randomSecondsString_();
    // HM
    case 10:
      return randomHoursString_() + " " + randomMinutesString_();
    // HS
    case 11:
      return randomHoursString_() + " " + randomSecondsString_();
    // H
    case 12:
      return randomHoursString_();
    // MS
    case 13:
      return randomMinutesString_() + " " + randomSecondsString_();
    // M
    case 14:
      return randomMinutesString_();
    // S
    case 15:
      return randomSecondsString_();
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

function randomSecondsString_() {

  var seconds = Math.floor(Math.random() * (59 + 1 - 1)) + 1;
  return seconds.toString() + "s";
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
  var seconds = Math.round((input - (days * 60 * 24) - (hours * 60) - minutes) * 60);

  var durationString = "";

  if (days > 0 ) {
    durationString = durationString + days.toString() + "d ";
  }

  if (hours > 0) {
    durationString = durationString + hours.toString() + "h ";
  }

  if (minutes > 0) {
      durationString = durationString + minutes.toString() + "m ";
  }

  if (seconds > 0) {
    durationString = durationString + seconds.toString() + "s";
  }

  return durationString.trim();
}
