"use client";
import React from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useRecoilValue } from "recoil";
import { AutoABCDButton, AutoPopButton } from "@/components/lineup/buttons";
import { SortOrderDropdown } from "@/components/lineup/dropdowns";
import * as state from "@/store";
import { teamTablesEmpty } from "@/components/lineup/utils";

export default function AutoButtons() {
  const teamTables = useRecoilValue(state.teamTables);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const sortOrder = useRecoilValue(state.sortOrder);
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const idsInLineupCount = idsInLineup.length;
  let showAutoABCDButton = false;
  if (
    Number(teeTimeCount) > 1 &&
    idsInLineupCount > 0 &&
    (idsInLineupCount % 3 === 0 || idsInLineupCount % 4 === 0) &&
    teamTablesEmpty(teamTables)
  ) {
    showAutoABCDButton = true;
  }
  let showAutoPopButton = false;
  let showSortOrderDropdown = false;
  if (idsInLineupCount > 0 && teamTablesEmpty(teamTables)) {
    showAutoPopButton = true;
    showSortOrderDropdown = true;
  }
  return (
    <>
      {showSortOrderDropdown && <SortOrderDropdown />}
      {showSortOrderDropdown &&
        sortOrder !== "byHandicap" &&
        showAutoABCDButton && (
          <div>
            Note: Sort by course handicap for the option to automatically create
            ABC(D) teams.
          </div>
        )}
      {sortOrder === "byHandicap" && showAutoABCDButton && <AutoABCDButton />}
      {showAutoPopButton && (
  <>
    <AutoPopButton />
    <div>
      Or: click <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'bottom' }}><ChevronDown size='24' strokeWidth='3px'/></span> to the right of each tee time to create teams manually.   The <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'bottom' }}><ChevronDown size='24' strokeWidth='3px'/></span>&apos;s will disappear once you have assigned all players to teams.
    </div>
    <div>
      Once you have created teams, you can move a team up one tee time by clicking <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'bottom' }}><ChevronUp size='24' strokeWidth='3px'/></span> to the left of a tee time.
    </div>
  </>
)}
    </>
  );
}
