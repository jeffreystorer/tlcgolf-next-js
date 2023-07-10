import React from 'react';
import { ChevronUp } from 'react-feather';

export default function HelpPage() {
  return (
    <div className='div--center'>
      <br></br>
      <table className='help-table'>
        <tbody>
          <tr>
            <td>
              <table className='table'>
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='help-table_topic'>
                      Table of Players and Groups
                    </td>
                    <td className='help-table_text'>
                      The players in your groups are listed in a table in a
                      Google Sheets spreadsheet. You may have had this table
                      created for you before you first used the app. If not, you
                      were prompted to create it when you first logged in.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td></td>
                    <td className='help-table_text'>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        To edit your players and groups,
                      </span>{' '}
                      click "More ..., Edit Table" on the dropdown menu in the
                      navigation bar at the top of the page. This opens a
                      browser tab with the Google Sheets spreadsheet. The sheet
                      with your table, named with your GHIN number, should be
                      open. If not, find your GHIN number in the list of sheets
                      at the bottom and click on it.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td></td>
                    <td className='help-table_text'>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        To add a player,
                      </span>{' '}
                      follow the existing format. A simple way to add a player
                      is to add new row where you wish the player to appear,
                      copy the row above or below, and then edit it. This will
                      ensure that you have the dropdown in the Tee column, where
                      you set a player's default tee. Do not just use a blank
                      cell and type in the tee name. When you have finished
                      editing your table, use the browser's back button to
                      return to the app, where your player list will be
                      refreshed automatically. If you do not use the browser's
                      back button, you may have to sign out and sign in again to
                      refresh your player list.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td></td>
                    <td className='help-table_text'>
                      <span style={{ fontWeight: 'bold' }}>
                        To add a group,
                      </span>{' '}
                      add a new column to your table. The group columns can
                      appear in any order after the Tee column. You can name a
                      group as you prefer. If your group name has a space, use
                      an underscore, e.g., "Working_Men's". If you add a dummy
                      group at the right end of the columns, named "Walk", the
                      app will let you show in your lineup whether or not a
                      player walks, which is useful if you try to put walkers
                      together and riders together.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td></td>
                    <td className='help-table_text'>
                      <span style={{ fontWeight: 'bold' }}>
                        To find the GHIN Number of a new player,
                      </span>{' '}
                      click "More ..., Lookup GHIN Information" on the dropdown
                      menu in the navigation bar at the top of the page.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td></td>
                    <td className='help-table_text'>
                      <span style={{ fontWeight: 'bold' }}>To add a guest</span>{' '}
                      to a group: add a row for the player, either
                      alphabetically or at the bottom, as you prefer. If you
                      don't know a guest's GHIN number, then use 9999991 as a
                      dummy GHIN number.{'  '}
                      <span style={{ fontWeight: 'bold' }}>
                        When you are using a dummy GHIN number to add a guest
                      </span>
                      {', '}
                      you may put more that the player's last name in the
                      "Last_Name" column, e.g., "Doe, John", "John Doe", etc. If
                      you want to add more than one guest, use the next
                      consecutive dummy value (e.g., 9999992) and so on.{'  '}
                      <span style={{ fontWeight: 'bold' }}>
                        If you know your guest's index
                      </span>
                      {', '}
                      then you may put it in parenthesis after the guest's name,
                      preceded by M for a man or W for a woman, e.g., John Guest
                      (M6.4) or Jane Guest (W12.2). If you don't enter an index
                      for a guest with a dummy GHIN number, your guest will
                      appear with "(no index)" after his or her name. You can
                      then set a manual course handicap for the guest (see
                      below). Whether or not you know the GHIN number, you
                      should add your guest(s) to your table before making a
                      lineup that will include the guest(s).
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td></td>
                    <td className='help-table_text'>
                      <span style={{ fontWeight: 'bold' }}>
                        To add a guest with a Canadian index
                      </span>
                      {', '} add the guest with a dummy GHIN number and put the
                      guest's Canadian card number in parenthesis after the
                      guest's name, preceded by CM for a man or CW for a woman,
                      e.g., John Guest (CM012345) or Jane Guest (CW456789).
                      {'  '}
                      <a
                        href='http://gcapp.golfnet.com/community/golfers/search'
                        target='_blank'
                        rel='noopener noreferrer'>
                        Click here to look up your Canadian guest's card number.
                      </a>
                      {'  '}
                      The card number appears after the name in the search
                      results list.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr>
            <td>
              <table className='table'>
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='help-table_topic'>Creating a Lineup</td>
                    <td className='help-table_text'>
                      Use the dropdowns to choose your group (if you have more
                      than one), course, playing date, number of tee times, and
                      link time. If you are going to play progs, make a choice
                      under the Progs Y/N? dropdown. If you wish to require
                      threesomes to make three more points per eighteen holes,
                      make a choice under the Progs Adj? dropdown. Choose 3 plus
                      3 to add three points per eighteen holes to the
                      threesomes's team progs or 4 minus 3 to subtract three
                      points per eighteen holes from the foursomes' team progs.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      Managing the Players in your Lineup
                    </td>
                    <td className='help-table_text'>
                      After making your dropdown choices, click Add/Delete
                      Players. When you have no players in your lineup, you will
                      see only an alphabetical list of the players in your
                      group. To add a player, click on his name. You will then
                      see a list to the right with the players in the lineup.
                      Continue adding players by clicking in the left list. To
                      remove a player, click the player's name and the player
                      will move back to the left list. If you just want to start
                      over, click Clear. This will remove all players from your
                      lineup. When you have finished adding players, you can
                      choose a sort order, using the dropdown at the bottom of
                      the right list. The sort order determines the order in
                      which players either appear in the list of players to be
                      assigned to teams manually or to be added to teams
                      automatically by the Auto buttons (see below). The default
                      sort order is Alphabetical. The other options are By
                      Handicap and Random. When you click Done, the Add/Delete
                      Players in Lineup box will close.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      Deleting Players from Your Lineup
                    </td>
                    <td className='help-table_text'>
                      If you have put the player on a team, you can remove the
                      player from the team (but not from the list of players
                      selected for the lineup) by clicking the player's name. To
                      remove one or more players from a team and also from the
                      list of players selected for the lineup, you can click
                      "Add/Delete Players" and click the player(s) to be
                      removed.
                    </td>
                  </tr>
                  <tr />
                  <tr />
                  <tr>
                    <td className='help-table_topic'>
                      Automatically Populating Teams in the Sort Order
                    </td>
                    <td className='help-table_text'>
                      For any sort order, as long as the number of tee times you
                      have selected accommodates the number of players you have
                      put in your lineup, you can automatically assign teams in
                      the order of your list of players, by clicking the Auto
                      Populate button. This is most useful with the By Handicap
                      and Random sort orders. The teams will be populated from
                      your list. Threesomes will go off before foursomes. If
                      your player count is divisible by three, then you can
                      control whether to have all threesomes by choosing the
                      correct number of tee times. For example, if you have
                      twelve players, choose three times to play in foursomes or
                      four times to play in threesomes. With fifteen players,
                      choose five times to play in threesomes or four times to
                      play as a mixed group. If you sort your list by handicap
                      and then Auto Populate, you will have the lowest handicap
                      players in the first tee time, the next lowest in the
                      next, etc.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      Automatically Populating ABC or ABCD Teams
                    </td>
                    <td className='help-table_text'>
                      If you sort by handicap, have an even multiple of three or
                      four players in your lineup and have selected the
                      appropriate number of tee times, you will see the Auto
                      ABCD button below the Auto Populate button. Clicking Auto
                      ABCD will create balanced ABC or ABCD teams.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      Manually Populating Teams
                    </td>
                    <td className='help-table_text'>
                      Use the dropdown arrows to the right of each tee time to
                      see the list of players not yet assigned to a team. Click
                      on a player's name to add the player to the team. This
                      will remove the player from the list of unassigned
                      players. To remove a player from a team, click on the
                      player's name and the player will return to the unassigned
                      list.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      Choose Tees for Each Player
                    </td>
                    <td className='help-table_text'>
                      When added to a team, a player has the tee choice set in
                      your table in the Google Sheets spreadsheet. If the player
                      is going to play from a different tee that day, use the
                      tee choice dropdown to the right of the player's course
                      handicaps to select it. This choice drives the computation
                      of the Team Hcp and Progs.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      To Override a Player's GHIN Course Handicap or Take a
                      Player Out of the Game
                    </td>
                    <td className='help-table_text'>
                      Click the * at the right end of the player's row, which
                      will bring up a dropdown of course handicaps. When you
                      select a manual course handicap, it is assigned to the
                      player's chosen tee. To take a player out of the game (and
                      remove the player from the Team Hcp calculation), select
                      Not In Game. To switch a player back to automatic GHIN
                      course handicap calculation, choose Auto from the *
                      dropdown menu.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>Setting Your Bets</td>
                    <td className='help-table_text'>
                      Type your bets and other information about the game in the
                      text box at the bottom. This text box will enlarge
                      automatically as you type to accommodate as many lines as
                      necessary.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>Saving a Lineup</td>
                    <td className='help-table_text'>
                      At the bottom of the Lineup page, there is a Save Lineup
                      as: box. Type the name of your lineup in the input box and
                      click the Save Lineup button. Your lineup will be saved to
                      storage in the cloud. Your saved lineups are available on
                      any device where you run the app, not just the one on
                      which you created the lineup. Also, if you make a lineup
                      one day and come back to it the next, the course handicaps
                      will be automatically updated using the players' current
                      indexes. When you click the Save Lineup button, you
                      automatically be taken to the Export page. Note that the
                      Save Lineup button will not appear until you have selected
                      a playing date, number of tee times, and link time, added
                      players to your lineup, and populated your teams.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      Retrieving a Saved Lineup
                    </td>
                    <td className='help-table_text'>
                      When you have one or more saved Lineups, you'll see the
                      Saved Lineups box at the top of the page. When you lick on
                      the name of a saved lineup, it will be loaded for editing
                      in the box below, with buttons to Export, Clear, or
                      Delete. Export will take you to the Export page and load
                      the lineup there. Clear will remove the current saved line
                      up and let you create a new lineup, without deleting the
                      saved lineup. Delete will remove the saved lineup from
                      your Saved Lineups list and delete it from the cloud
                      storage.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      Clearing all Team Assignments
                    </td>
                    <td className='help-table_text'>
                      If you wish to clear all team assignments without changing
                      your selection of players in the lineup, click Clear
                      Players from Teams.
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className='help-table_topic'>
                      Moving a Team to a Different Tee Time
                    </td>
                    <td className='help-table_text'>
                      Click{' '}
                      <span>
                        <ChevronUp size='24' strokeWidth='3px' />
                      </span>{' '}
                      next to a tee time other than the first and the team will
                      move up one tee time.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
