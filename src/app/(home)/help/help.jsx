"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import ScrollToTop from "react-scroll-to-top";
import { sget } from "@/components/common/utils";

export default function Help() {
  const router = useRouter();
  const isLoggedIn = sget("isLoggedIn");
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [router, isLoggedIn]);

  function handleClick(e) {
    e.preventDefault();
    const details = document.getElementById("details");
    details.removeAttribute("open");
    const href = e.target.hash;
    const id = href.slice(1);
    const link = document.getElementById(id);
    link.scrollIntoView();
  }

  return (
    <div id="help">
      <h2>Help</h2>
      <details id="details">
        <summary>Table of Contents</summary>
        <ul>
          <li>
            <a onClick={handleClick} href="#table">
              Table of Players and Groups
            </a>
            <ul>
              <li>
                <a onClick={handleClick} href="#edit">
                  Editing Your Players and Groups
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#addplayer">
                  Adding a Player
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#addgroup">
                  Adding a Group
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#lookup">
                  Finding the GHIN Number of a New Player
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#addguest">
                  Adding a Guest
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#addcanadianguest">
                  Adding a Guest with a Canadian GHIN Number
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a onClick={handleClick} href="#lineups">
              Lineups
            </a>
            <ul>
              <li>
                <a onClick={handleClick} href="#create">
                  Creating a Lineup
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#changetees">
                  Changing the Tees Selected
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#manageplayers">
                  Managing the Players in Your Lineup
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#deleteplayers">
                  Deleting Players from Your Lineup
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#autopop">
                  Automatically Creating Teams in the Sort Order
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#autoabcd">
                  Automatically Creating ABC or ABCD Teams
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#manualpop">
                  Manually Creating Teams
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#choosetees">
                  Choosing Tees for Each Player
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#override">
                  Overriding a Player&apos;s GHIN Course Handicap or Taking a
                  Player Out of the Game
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#setbets">
                  Setting Your Bets
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#save">
                  Saving a Lineup
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#retrieve">
                  Retrieving a Saved Lineup
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#clearteams">
                  Clearing All Team Assignmennts
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#moveteam">
                  Moving a Team to a Different Tee Time
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a onClick={handleClick} href="#exportlineup">
              Exporting Your Lineup
            </a>
            <ul>
              <li>
                <a onClick={handleClick} href="#format">
                  Formatting Your Lineup
                </a>
              </li>
              <li>
                <a onClick={handleClick} href="#send">
                  Sending Your Lineup to Your Players
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </details>
      <h3 id="table">Table of Players and Groups</h3>
      <p>
        The players in your groups are listed in a table in a Google Sheets
        spreadsheet. You had this table created for you before you first used
        the app.
      </p>
      <h4 id="edit">Editing Your Players and Groups</h4>
      <p>
        Click &ldquo;More ..., Edit Table&rdquo; on the dropdown menu in the
        navigation bar at the top of the page. This opens a browser tab with the
        Google Sheets spreadsheet. The sheet with your table, named with your
        GHIN number, should be open. If not, find your GHIN number in the list
        of sheets at the bottom and click on it.
      </p>
      <h4 id="addplayer">Adding a Player</h4>
      <p>
        Follow the existing format. A simple way to add a player is to add new
        row where you wish the player to appear, copy the row above or below,
        and then edit it. This will ensure that you have the dropdown in the Tee
        column, where you set a player&apos;s default tee. Do not just use a
        blank cell and type in the tee name. When you have finished editing your
        table, use the browser&apos;s back button to return to the app, where
        your player list will be refreshed automatically. If you do not use the
        browser&apos;s back button, you may have to sign out and sign in again
        to refresh your player list.
      </p>
      <h4 id="addgroup">Adding a Group</h4>
      <p>
        Add a new column to your table. The group columns can appear in any
        order after the Tee column. You can name a group as you prefer. If your
        group name has a space, use an underscore, e.g.,
        &ldquo;Working_Men&apos;s&rdquo;. If you add a dummy group at the right
        end of the columns, named &ldquo;Walk&rdquo;, the app will let you show
        in your lineup whether or not a player walks, which is useful if you try
        to put walkers together and riders together.
      </p>
      <h4 id="lookup">Finding the GHIN Number of a New Player</h4>
      <p>
        Click &ldquo;More ..., Lookup GHIN Information&rdquo; on the dropdown
        menu in the navigation bar at the top of the page.
      </p>
      <h4 id="addguest">Adding a Guest</h4>
      <p>
        Add a row for the player, either alphabetically or at the bottom, as you
        prefer. If you don&apos;t know a guest&apos;s GHIN number, then use
        9999991 as a dummy GHIN number.
        <span>
          <b> When you are using a dummy GHIN number to add a guest, </b>
        </span>
        you may put more that the player&apos;s last name in the
        &ldquo;Last_Name&rdquo; column, e.g., &ldquo;Doe, John&rdquo;,
        &ldquo;John Doe&rdquo;, etc. If you want to add more than one guest, use
        the next consecutive dummy value (e.g., 9999992) and so on.
        <span>
          <b> If you know your guest&apos;s index, </b>
        </span>
        then you may put it in parenthesis after the guest&apos;s name, preceded
        by M for a man or W for a woman, e.g., John Guest (M6.4) or Jane Guest
        (W12.2). If you don&apos;t enter an index for a guest with a dummy GHIN
        number, your guest will appear with &ldquo;(no index)&rdquo; after his
        or her name. You can then set a manual course handicap for the guest
        (see below). Whether or not you know the GHIN number, you should add
        your guest(s) to your table before making a lineup that will include the
        guest(s).
      </p>
      <h4 id="addcanadianguest">Adding a Guest with a Canadian Index</h4>
      <p>
        Add the guest with a dummy GHIN number and put the guest&apos;s Canadian
        card number in parenthesis after the guest&apos;s name, preceded by CM
        for a man or CW for a woman, e.g., John Guest (CM012345) or Jane Guest
        (CW456789).
        {"  "}
        <a
          href="http://gcapp.golfnet.com/community/golfers/search"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to look up your Canadian guest&apos;s card number.
        </a>
        {"  "}
        The card number appears after the name in the search results list.
      </p>
      <h3 id="lineups">Lineups</h3>
      <h4 id="create">Creating a Lineup</h4>
      <p>
        Use the dropdowns to choose your group (if you have more than one),
        course, playing date, number of tee times, and link time. If you are
        going to play progs, make a choice under the Progs Y/N? dropdown. If you
        wish to require threesomes to make three more points per eighteen holes,
        make a choice under the Progs Adj? dropdown. Choose 3 plus 3 to add
        three points per eighteen holes to the threesomes&apos;s team progs or 4
        minus 3 to subtract three points per eighteen holes from the
        foursomes&apos; team progs.
      </p>
      <h4 id="changetees">Changing the Tees Selected</h4>
      <p>
        Click <button>Change Tees</button> and select the group of tees to
        display. To select multiple tees, on a PC, use Ctrl-Click; on a Mac, use
        Cmd-Click. When you have made your selection, click{" "}
        <button>Change</button>.
      </p>
      <h4 id="manageplayers">Managing the Players in Your Lineup</h4>
      <p>
        After making your dropdown choices, click{" "}
        <button>Add/Delete Players</button>. When you have no players in your
        lineup, you will see only an alphabetical list of the players in your
        group. To add a player, click on his name. You will then see a list to
        the right with the players in the lineup. Continue adding players by
        clicking in the left list. To remove a player, click the player&apos;s
        name and the player will move back to the left list. If you just want to
        start over, click Clear. This will remove all players from your lineup.
        When you have finished adding players, you can choose a sort order,
        using the dropdown at the bottom of the right list. The sort order
        determines the order in which players either appear in the list of
        players to be assigned to teams manually or to be added to teams
        automatically by the create team buttons (see below). The default sort
        order is Alphabetical. The other options are By Course Hcp and Random.
        When you click Done, the Add/Delete Players in Lineup box will close.
      </p>
      <h4 id="deleteplayers">Deleting Players from Your Lineup</h4>
      <p>
        If you have put the player on a team, you can remove the player from the
        team (but not from the list of players selected for the lineup) by
        clicking the player&apos;s name. To remove one or more players from a
        team and also from the list of players selected for the lineup, you can
        click <button>Add/Delete Players</button> and click the player(s) to be
        removed.
      </p>
      <h4 id="autopop">Automatically Creating Teams in the Sort Order</h4>
      <p>
        For any sort order, as long as the number of tee times you have selected
        accommodates the number of players you have put in your lineup, you can
        automatically create teams in the sort order of your list of players.
        Depending on the sort order, you will see
        <button>Create Teams by Course Hcp (# players)</button>,{" "}
        <button>Create Alpha Teams (# players)</button>, or{" "}
        <button>Create Random Teams (# players)</button>. This is most useful
        with the By Course Hcp and Random sort orders. The teams will be
        populated from your list. Threesomes will go off before foursomes. If
        your player count is divisible by three, then you can control whether to
        have all threesomes by choosing the correct number of tee times. For
        example, if you have twelve players, choose three times to play in
        foursomes or four times to play in threesomes. With fifteen players,
        choose five times to play in threesomes or four times to play as a mixed
        group. If you sort your list by handicap and then Auto Populate, you
        will have the lowest handicap players in the first tee time, the next
        lowest in the next, etc.
      </p>
      <h4 id="autoabcd">Automatically Creating ABC or ABCD Teams</h4>
      <p>
        If you sort by course handicap, have an even multiple of three or four
        players in your lineup and have selected the appropriate number of tee
        times, you will also see{" "}
        <button>Create ABC(D) Teams (# players)</button>. Clicking this will
        create balanced ABC or ABCD teams, depending on whether you have
        threesomes or foursomes.
      </p>
      <h4 id="manualpop">Manually Creating Teams</h4>
      <p>
        Use the dropdown arrows to the right of each tee time to see the list of
        players not yet assigned to a team. This list will appear in your chosen
        sort order. Click on a player&apos;s name to add the player to the team.
        This will remove the player from the list of unassigned players. To
        remove a player from a team, click on the player&apos;s name and the
        player will return to the unassigned list.
      </p>
      <h4 id="choosetees">Choose Tees for Each Player</h4>
      <p>
        When added to a team, a player has the tee choice set in your table in
        the Google Sheets spreadsheet. If the player is going to play from a
        different tee that day, use the tee choice dropdown to the right of the
        player&apos;s course handicaps to select it. This choice drives the
        computation of the Team Hcp and Progs.
      </p>
      <h4 id="override">
        Overriding a Player&apos;s GHIN Course Handicap or Taking a Player Out
        of the Game
      </h4>
      <p>
        Click the * at the right end of the player&apos;s row, which will bring
        up a dropdown of course handicaps. When you select a manual course
        handicap, it is assigned to the player&apos;s chosen tee. To take a
        player out of the game (and remove the player from the Team Hcp
        calculation), select Not In Game. To switch a player back to automatic
        GHIN course handicap calculation, choose Auto from the * dropdown menu.
      </p>
      <h4 id="setbets">Setting Your Bets</h4>
      <p>
        Type your bets and other information about the game in the textbox at
        the bottom. This textbox will enlarge automatically as you type to
        accommodate as many lines as necessary. Or, you can click{" "}
        <button>Choose Game Options</button>, which will bring up a screen where
        you can choose the options for your game. When you are done, click{" "}
        <button>Set Options</button> to return to the lineup screen. You can
        then edit the text as you wish. If you want to start over with an empty
        textbox, click <button>Clear Game</button>.
      </p>
      <h4 id="save">Saving a Lineup</h4>
      <p>
        At the bottom of the Lineup page, there is a Save Lineup as: box. Type
        the name of your lineup in the input box and click{" "}
        <button>Save Lineup</button>. Your lineup will be saved to storage in
        the cloud. Your saved lineups are available on any device where you run
        the app, not just the one on which you created the lineup. Also, if you
        make a lineup one day and come back to it the next, the course handicaps
        will be automatically updated using the players&apos; current indexes.
        When you click <button>Save Lineup</button>, you will automatically be
        taken to the Export page. Note that <button>Save Lineup</button> will
        not appear until you have selected a playing date, number of tee times,
        and link time, added players to your lineup, and populated your teams.
      </p>
      <h4 id="retrieve">Retrieving a Saved Lineup</h4>
      <p>
        When you have one or more saved Lineups, you&apos;ll see the Saved
        Lineups box at the top of the page. When you lick on the name of a saved
        lineup, it will be loaded for editing in the box below, with the buttons{" "}
        <button>Export</button> <button>Clear</button> <button>Delete</button>.{" "}
        <button>Export</button> will take you to the Export page and load the
        lineup there. <button>Clear</button> will remove the current saved line
        up and let you create a new lineup, without deleting the saved lineup.{" "}
        <button>Delete</button> will remove the saved lineup from your Saved
        Lineups list and delete it from the cloud storage.
      </p>
      <h4 id="clearteams">Clearing All Team Assignments</h4>
      <p>
        If you wish to clear all team assignments without changing your
        selection of players in the lineup, click{" "}
        <button>Clear Players from Teams</button>.
      </p>
      <h4 id="moveteam">Moving a Team to a Different Tee Time</h4>
      <p>
        Click
        <span id="chevronup"> ^ </span>
        next to a tee time other than the first and the team will move up one
        tee time.
      </p>
      <h3 id="exportlineup">Exporting Your Lineup</h3>
      <h4 id="format">Formatting Your Lineup</h4>
      <p>
        The Export page offers you some display options for formatting your
        lineup. There are four toggles, which let you choose whether or not to
        show first name, team handicap, individual handicaps, and local numbers.
      </p>
      <h4 id="send">Sending Your Lineup to Your Players</h4>
      <p>
        Depending on your device (PC, Mac, iPad/iPhone, or Android), you will
        see all or some of the following buttons:
      </p>
      <p>
        Desktops only:
        <br />
        <button>Copy Lineup to Clipboard</button> will copy an image of the
        lineup to the clipboard, which you can paste into an email.
      </p>
      <p>
        All devices:
        <br />
        <button>Copy Players to Clipboard</button> will copy a list of the
        players in your lineup to the clipboard, which you can paste into an
        email.
        <br />
        <button>Download Screenshot</button> will download an image of your
        lineup, which you can attach to an email.
        <br />
        <button>Download PDF</button> will reveal a dropdown where you can
        select a PDF format of rows(s) x columns to print multiple images of the
        lineup on a single page. When you select a format, two more buttons
        appear: <button>Portrait # X #</button> and{" "}
        <button>Landscape # X #</button>, whick will create a PDF, which you can
        print and cut up into individual images.
      </p>
      <ScrollToTop smooth />
    </div>
  );
}
