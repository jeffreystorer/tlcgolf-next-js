import useLineupService from '@/components/lineup/hooks/useLineupService';

export default function useSaveLineupToFirebase() {
  const { createLineup } = useLineupService();

  function saveLineupToFirebase(
    title,
    playersInLineup,
    players,
    group,
    course,
    playingDate,
    teeTimeCount,
    linkTime,
    progs069,
    progAdj,
    teamTables,
    textareaValue,
    teesSelected
  ) {
    const saveLineup = () => {
      var data = {
        title: title,
        lineup: {
          playersInLineup: playersInLineup,
          players: players,
          game: group,
          course: course,
          playingDate: playingDate,
          teeTimeCount: teeTimeCount,
          linkTime: linkTime,
          progs069: progs069,
          progAdj: progAdj,
          teamTables: teamTables,
          textareaValue: textareaValue,
          teesSelected: teesSelected,
        },
      };

      createLineup(data);
    };

    saveLineup();
  }

  return saveLineupToFirebase;
}
