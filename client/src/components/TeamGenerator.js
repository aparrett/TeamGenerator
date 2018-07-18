const TeamGenerator = () => {
  // Testing with 3 players per team and 15 players total.
  const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const max = Math.floor(players.length / 3);
  const teamSize = 3;
  let teammateCounters = [];
  let matchups = [];
  let rounds = [];


  // Fill teammateCounters with empty values.
  for (let i = 0; i < players.length; i++) {
    teammateCounters[i] = new Array(players.length + 1).join('0').split('').map(parseFloat);
  }

  // Create first round of teams.
  rounds.push(generateRoundOfTeams(players));
  addTeammateCounters(rounds[0]);
  matchups.push(rounds[0]);
  console.log('round', rounds[0]);

  console.log('teammateCounters', teammateCounters);
  console.log('matchups', matchups);

  // Create another round of teams.
  rounds.push(generateRoundOfTeams(players));
  addTeammateCounters(rounds[1]);
  matchups.push(rounds[1]);
  console.log('round', rounds[1])

  // Create another round of teams.
  rounds.push(generateRoundOfTeams(players));
  addTeammateCounters(rounds[2]);
  matchups.push(rounds[2]);
  console.log('round', rounds[2])

  // Create another round of teams.
  rounds.push(generateRoundOfTeams(players));
  addTeammateCounters(rounds[3]);
  matchups.push(rounds[3]);
  console.log('round', rounds[3])

  console.log('teammateCounters', teammateCounters);
  console.log('matchups', matchups);

  function generateRoundOfTeams() {
    let teams = [];
    if (rounds.length === 0) {
      const playersShuffled = shuffle(players);
      
      for (let i = 0; i < max; i++) {
        const team = playersShuffled.slice(i*3, i*3+3);
        teams.push(team);
      }

      return teams;
    }

    let needingTeam = shuffle(players);
    
    while(needingTeam.length > 0){
      if (needingTeam.length === teamSize) {
        teams.push(needingTeam);
        return teams;
      }

      // Other players that the player has not been paired with.
      let notTeamedWith = [];
      const player = needingTeam[0];
      console.log('player', player)

      Object.keys(teammateCounters[player - 1]).forEach(p => {
        p = parseInt(p);
        if (teammateCounters[player - 1][p] === 0 && p !== player - 1) {
          notTeamedWith.push(p + 1);
        }
      });
      
      const teammates = [];
      
      if (notTeamedWith.length === 0 || notTeamedWith.length === 1) {
        console.log('not teamed with', notTeamedWith)
        teammates.push(needingTeam[1]);
        teammates.push(needingTeam[2]);
      } else {
        const notTeamedWithAndNeedingTeam = shuffle(notTeamedWith.filter(p => needingTeam.includes(p)));
        console.log('not teamed with shuffled', notTeamedWithAndNeedingTeam)
        teammates.push(notTeamedWithAndNeedingTeam[0]);
        teammates.push(notTeamedWithAndNeedingTeam[1]);
      }

      const team = [player, ...teammates];
      console.log('team', team)
      teams.push(team);
      needingTeam = needingTeam.filter(p => !team.includes(p) || !team.includes(player));
      console.log('needing team', needingTeam)
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

  function addTeammateCounters(teams) {
    // Original loop through each team.
    for (let i = 0; i < teams.length; i++) {
      // Loop through each player.
      for (let k = 0; k < teams[0].length; k++) {
        const player = teams[i][k];
        const teammates = teams[i];
        // Loop through each teammate, adding counters to player's counter array.
        for (let j = 0; j < teammates.length; j++) {
          const teammate = teams[i][j];
          if (player !== teammate) {
            teammateCounters[player-1][teammate-1] += 1;
          }
        }
      }
    }
  }
}

export default TeamGenerator;