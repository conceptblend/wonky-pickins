const POINTS_FOR_WIN = 2;
const POINTS_FOR_LOSS = -1;

class Player {
  constructor(name = "Untitled") {
    this.name = name;
    this.points = 0;
    this.choiceHistory = [];
  }
  madeGuess(correct = true) {
    if (correct) {
      this.points += POINTS_FOR_WIN;
    } else {
      this.points += POINTS_FOR_LOSS;
    }
    return 0 + this.points;
  }
}

const PLAYER_COUNT = 3;
const players = [];

for (let i = 0; i < PLAYER_COUNT; i++) {
  players.push(new Player(`Player ${i + 1}`));
}

const ROUNDS = 7;
const QUESTIONS_PER_ROUND = 2;
for (let r = 0; r < ROUNDS; r++) {
  console.log(`== Round ${r + 1}`);
  for (let i = 0; i < PLAYER_COUNT; i++) {
    for (let q = 0; q < QUESTIONS_PER_ROUND; q++) {
      players[i].madeGuess(Math.random() > 0.5);
    }
    console.log(`\t${players[i].name}: ${players[i].points}`);
  }
}
