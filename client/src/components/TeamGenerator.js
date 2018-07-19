const TeamGenerator = () => {
  // Testing with 3 players per team and 15 players total.
  const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const numTeams = Math.floor(players.length / 3);
  const teamSize = 3;
  const rounds = 5;
  // The rounds needed until any given player has played with everyone.
  const roundsNeeded = Math.floor(players.length / (teamSize - 1));
  let teammateCounters = [];
  let roundsOfTeams = [];

  fillTeammateCounters();

  // Create rounds of teams.
  for (let i = 1; i <= rounds; i++){
    const roundNumber = i;
    const round = generateRoundOfTeams(roundNumber);
    roundsOfTeams.push(round);

    if (i === roundsNeeded) {
      fillTeammateCounters();
    }

    addTeammateCounters(round);
    const temp = teammateCounters.slice()
    console.log('teammate counters', temp)
  }

  console.log('rounds of teams', roundsOfTeams);
  console.log('teammate counters', teammateCounters);

    // Fill teammateCounters with empty values to represent that a player
  // has not yet played with any player.
  function fillTeammateCounters() {
    let counters = [];
    for (let i = 0; i < players.length; i++) {
      counters[i] = new Array(players.length + 1).join('0').split('').map(parseFloat);
    }
    teammateCounters = counters;
  }

  function generateRoundOfTeams() {
    let teams = [];
    if (roundsOfTeams.length === 0) {
      const playersShuffled = shuffle(players);
      
      for (let i = 0; i < numTeams; i++) {
        const team = playersShuffled.slice(i*3, i*3+3);
        teams.push(team);
      }

      return teams;
    }

    let needingTeam = shuffle(players);
    
    while(needingTeam.length > 0){
      // Other players that the player has not been paired with.
      const player = needingTeam[0];
      needingTeam = needingTeam.filter(p => p !== player);
      const notTeamedWith = getNotTeamedWith(player);

      console.log('player', player)
      console.log('teammates', teammateCounters[player - 1])

      const teammates = getTeammates(needingTeam, notTeamedWith);
      const team = [player, ...teammates];

      console.log('Not teamed with', notTeamedWith)
      console.log('Needing Team', needingTeam)
      console.log('chosen team', team)

      teams.push(team);
      needingTeam = needingTeam.filter(p => !team.includes(p));
    }
    
    return teams;
  }

  function getNotTeamedWith(player) {
    let notTeamedWith = [];
    Object.keys(teammateCounters[player - 1]).forEach(p => {
      p = parseInt(p);
      if (teammateCounters[player - 1][p] === 0 && p !== player - 1) {
        notTeamedWith.push(p + 1);
      }
    });
    return notTeamedWith;
  }

  function getTeammates(needingTeam, notTeamedWith) {

    if (needingTeam.length === teamSize - 1) {
      return needingTeam;
    }

    const notTeamedWithAndNeedingTeam = shuffle(notTeamedWith.filter(p => needingTeam.includes(p)));
    
    if (notTeamedWith.length === 0 || notTeamedWithAndNeedingTeam.length === 0) {
      return [needingTeam[0], needingTeam[1]];
    } 
    
    if (notTeamedWith.length === 1) {
      if (needingTeam[0] === notTeamedWith[0]) {
        return [notTeamedWith[0], needingTeam[1]];
      }
      
      return [notTeamedWith[0], needingTeam[0]];
    }

    if (notTeamedWithAndNeedingTeam.length === 1) {
      if (needingTeam[0] === notTeamedWithAndNeedingTeam[0]) {
        return [notTeamedWithAndNeedingTeam[0], needingTeam[1]];
      }
      
      return [notTeamedWithAndNeedingTeam[0], needingTeam[0]];
    }
      
    return [notTeamedWithAndNeedingTeam[0], notTeamedWithAndNeedingTeam[1]];
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