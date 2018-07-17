const TeamGenerator = () => {
  // Testing with 3 players per team and 15 players total.
  const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const max = Math.floor(players.length / 3);
  let teammateCounters = [];
  let matchups = [];

  // Fill teammateCounters with empty values.
  for (let i = 0; i < players.length; i++) {
    teammateCounters[i] = new Array(players.length + 1).join('0').split('').map(parseFloat);
  }

  // Create first round of teams.
  const round = createRandomTeams(players, max);
  addTeammateCounters(round, teammateCounters);
  matchups.push(round);
  console.log('round', round)

  // Create another round of teams.
  const round1 = createRandomTeams(players, max);
  addTeammateCounters(round1, teammateCounters);
  matchups.push(round1);
  console.log('round', round1)

  console.log('teammateCounters', teammateCounters);
  console.log('matchups', matchups);


  function createRandomTeams(array, max) {
    let teams = [];
    const shuffled = shuffle(array);
    
    for (let i = 0; i < max; i++) {
      const newTeam = shuffled.slice(i*3, i*3+3);
      teams.push(newTeam);
    }
    return teams;
  }

  function shuffle(array) {
    let newArray = array.slice(0);
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = newArray[counter];
      newArray[counter] = newArray[index];
      newArray[index] = temp;
    }

    return newArray;
  }

  function addTeammateCounters(teams, teammateCounters) {
    // Original loop through each team.
    for (let i = 0; i < teams.length; i++) {
      // Loop through each player.
      for (let k = 0; k < teams[0].length; k++) {
        const player = teams[i][k];
        const teammates = teams[i];
        // Loop through each teammate, adding counters to player's counter array.
        for (let j = 0; j < teammates.length; j++) {
          const teammate = teams[i][j];
          if (player != teammate) {
            teammateCounters[player-1][teammate-1] += 1;
          }
        }
      }
    }
  }
}

export default TeamGenerator;