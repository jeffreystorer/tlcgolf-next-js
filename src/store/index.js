"use client";

import { atom, selector } from "recoil";
import { getPlayersNotInTeeTime } from "@/components/lineup/utils";
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

/*\/\/\/\/\/\/Values set by useSetAllRecoilState\/\/\/\/\/\/\*/

export const course = atom({
  key: "course",
  default: "",
  effects: [localStorageEffect("course")],
});
export const group = atom({
  key: "group",
  default: "",
  effects: [localStorageEffect("group")],
});
export const teesSelected = atom({
  key: "teesSelected",
  default: "",
  effects: [localStorageEffect("teesSelected")],
});

export const captains = atom({
  key: "captains",
  default: [localStorageEffect("captains")],
});

export const bets = atom({
  key: "bets",
  default: [localStorageEffect("bets")],
});

export const hasSchedule = atom({
  key: "hasSchedule",
  default: [localStorageEffect("hasSchedule")],
});

export const schedules = atom({
  key: "schedules",
  default: [localStorageEffect("schedules")],
});

export const foundGolfer = atom({
  key: "foundGolfer",
  default: [localStorageEffect("foundGolfer")],
});

export const wednesdaySchedules = atom({
  key: "wednesdaySchedules",
  default: [localStorageEffect("wednesdaySchedules")],
});

export const groups = atom({
  key: "groups",
  default: [localStorageEffect("groups")],
});

export const allPlayersInTable = atom({
  key: "allPlayersInTable",
  default: [localStorageEffect("allPlayersInTable")],
});

export const courseData = atom({
  key: "courseData",
  default: [localStorageEffect("courseData")],
});
/*/\/\/\Values set by useSetAllRecoilState/\/\/\*/

export const idsInLineup = selector({
  key: "idsInLineup",
  get: ({ get }) => {
    return get(playersInLineup).map((player) => player.id.toString());
  },
});

export const playersInLineup = atom({
  key: "playersInLineup",
  default: [],
});

export const sortOrder = atom({
  key: "sortOrder",
  default: "alphabetical",
});

export const lineupTitle = atom({
  key: "lineupTitle",
  default: "New Lineup",
});

export const showLocalNumbers = atom({
  key: "showLocalNumbers",
  default: false,
});

export const showTeamHcp = atom({
  key: "showTeamHcp",
  default: false,
});

export const showAddTeamMember = atom({
  key: "showAddTeamMember",
  default: {
    team0: false,
    team1: false,
    team2: false,
    team3: false,
    team4: false,
    team5: false,
    team6: false,
    team7: false,
    team8: false,
    team9: false,
  },
});

export const showFirstName = atom({
  key: "showFirstName",
  default: false,
});

export const showIndividualHandicaps = atom({
  key: "showIndividualHandicaps",
  default: true,
});

export const showAddDeletePlayers = atom({
  key: "showAddDeletePlayers",
  default: false,
});

export const showAddDeletePlayersButton = atom({
  key: "showAddDeletePlayersButton",
  default: true,
});

export const showAddPlayers = atom({
  key: "showAddPlayers",
  default: false,
});

export const showDeletePlayers = atom({
  key: "showDeletePlayers",
  default: false,
});

export const showChangeTees = atom({
  key: "showChangeTees",
  default: false,
});

export const showDownloadPDF = atom({
  key: "showDownloadPDF",
  default: false,
});
export const showDownloadPDFButton = atom({
  key: "showDownloadPDFButton",
  default: true,
});

export const teeAssignments = atom({
  key: "teeAssignments",
  default: [1],
});

export const linkTime = atom({
  key: "linkTime",
  default: "Set Link Time Above",
});

export const teeTimeCount = atom({
  key: "teeTimeCount",
  default: "",
});

export const teamTables = atom({
  key: "teamTables",
  default: {
    teeAssignments: [1],
    team0: [],
    team1: [],
    team2: [],
    team3: [],
    team4: [],
    team5: [],
    team6: [],
    team7: [],
    team8: [],
    team9: [],
  },
});

export const playingDate = atom({
  key: "playingDate",
  default: "Date",
});

export const textareaValue = atom({
  key: "textareaValue",
  default: "",
});

export const progs069 = atom({
  key: "progs069",
  default: "",
});

export const progAdj = atom({
  key: "progAdj",
  default: "",
});

export const teeChoiceChangedId = atom({
  key: "teeChoiceChangedId",
  default: 0,
});

export const overrideCHChoiceChangedId = atom({
  key: "overrideCHChoiceChangedId",
  default: 0,
});

export const playersNotInTeeTime = selector({
  key: "playersNotInTeeTime",
  get: ({ get }) => {
    return getPlayersNotInTeeTime(get(playersInLineup), get(teamTables));
  },
});

export const currentLineupIndex = atom({
  key: "currentLineupIndex",
  default: -1,
});

export const currentLineup = atom({
  key: "currentLineup",
  default: null,
});

export const currentLineupKey = atom({
  key: "currentLineupKey",
  default: "",
});

export const screenshotUrl = atom({
  key: "screenshotUrl",
  default: "",
});

export const missingPlayerMessage = atom({
  key: "missingPlayerMessage",
  default: "",
});

export const jpgImage = atom({
  key: "jpgImage",
  default: null,
});

export const dimensionIndex = atom({
  key: "dimensions",
  default: 0,
});

export const okToSave = selector({
  key: "okToSave",
  get: ({ get }) => {
    let ok = false;
    if (
      get(playingDate) !== "Date" &&
      get(teeTimeCount) > 0 &&
      get(linkTime) !== "Link Time" &&
      get(playersInLineup).length > 0 &&
      get(teamTables).team0.length > 0
    ) {
      ok = true;
    }
    return ok;
  },
});

export const okToAddPlayers = selector({
  key: "okToAddPlayers",
  get: ({ get }) => {
    let ok = false;
    if (
      get(playingDate) !== "Date" &&
      get(teeTimeCount) > 0 &&
      get(linkTime) !== "Link Time"
    ) {
      ok = true;
    }
    return ok;
  },
});

export const realGhinNumber = selector({
  key: "realGhinNumber",
  get: ({ get }) => {
    let ghinNumber = JSON.parse(localStorage.getItem("ghinNumber"));
    return ghinNumber;
  },
});

export const captainGhinNumber = atom({
  key: "captainGhinNumber",
  default: realGhinNumber,
});

export const deleteAll = atom({
  key: "deleteAll",
  default: true,
});

export const nextLineupIndex = atom({
  key: "nextLineupIndex",
  default: "",
});
