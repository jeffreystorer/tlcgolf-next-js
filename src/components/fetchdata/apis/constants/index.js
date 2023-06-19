const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SCHEDULES_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID_WEDNESDAY_SCHEDULES;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/';
const KEY = '?key=' + API_KEY;
const BATCH_KEY = '&key=' + API_KEY;
const WEDNESDAY_URL = BASE_URL + SCHEDULES_ID + '/values/Sheet1' + KEY;
const ROSTER_URL = BASE_URL + SHEET_ID + '/values/GHIN_Numbers' + KEY;
const COURSEDATA_URL =
  BASE_URL + SHEET_ID + '/values/Course_Data_From_GHIN' + KEY; //'/values/Course_Data' + KEY;
const SCHEDULES_URL = BASE_URL + SHEET_ID + '/values/Schedules' + KEY;
const BETS_URL = BASE_URL + SHEET_ID + '/values/Bets' + KEY;
const CAPTAINS_URL = BASE_URL + SHEET_ID + '/values/Captains' + KEY;
const TUTORIALS_URL = BASE_URL + SHEET_ID + '/values/Tutorials' + KEY;
const SHEET_URL =
  BASE_URL + SHEET_ID + '?fields=sheets.properties&key=' + API_KEY;
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const X_CORS_API_KEY = import.meta.env.VITE_X_CORS_API_KEY;

export {
  CLIENT_ID,
  BASE_URL,
  SHEET_ID,
  KEY,
  API_KEY,
  WEDNESDAY_URL,
  ROSTER_URL,
  COURSEDATA_URL,
  SCHEDULES_URL,
  BETS_URL,
  CAPTAINS_URL,
  TUTORIALS_URL,
  SHEET_URL,
  SCOPE,
  X_CORS_API_KEY,
  BATCH_KEY,
};
