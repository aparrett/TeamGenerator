const TeamGenerator = () => {
  // Testing with 3 players per team and 15 players total.
  const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const teamSize = 3;
  const numTeams = Math.floor(players.length / teamSize);
  const rounds = 5;
  let maxOnesCount = 0;
  let maxOnesCounters = [];
  
  for (let i = 0; i < 100000; i++) {
    let teammateCounters = fillTeammateCounters();

    for (let j = 0; j < 4; j++) {
      const playersShuffled = shuffle(players);
      let roundOfTeams = [];

      for (let k = 0; k < numTeams; k++) {
        const team = playersShuffled.slice(k * 3, k * 3 + 3);
        roundOfTeams.push(team);
      }

      teammateCounters = getTeammateCounters(teammateCounters, roundOfTeams);
    }

    let numberOfOnes = 0;
    teammateCounters.forEach(player => {
      player.forEach(timesPlayedWith => {
        if (timesPlayedWith === 1) {
          numberOfOnes++;
        }
      });
    });

    if (numberOfOnes > maxOnesCount){
      maxOnesCount = numberOfOnes;
      maxOnesCounters = teammateCounters;
    }
  }
  
  console.log('max ones', maxOnesCount);
  console.log('max ones counters', maxOnesCounters);

    // Fill teammateCounters with empty values to represent that a player
  // has not yet played with any player.
  function fillTeammateCounters() {
    let counters = [];
    for (let i = 0; i < players.length; i++) {
      counters[i] = new Array(players.length + 1).join('0').split('').map(parseFloat);
    }
    return counters;
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

  function getTeammateCounters(counters, teams) {
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
            counters[player-1][teammate-1] += 1;
          }
        }
      }
    }

    return counters;
  }
}

export default TeamGenerator;