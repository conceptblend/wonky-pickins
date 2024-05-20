const BY_GAME = {
  static: [
    // "Will the game go to Overtime? (Yes or No)",
    // "Will a player be ejected from the game? (Yes or No)",
    // "Will the 1st intermission interview be with a Forward or Defenseman?",
    "Will the total number of goals in the game be EVEN or ODD? (Even or Odd)",
    // "Will someone get a Gordie Howe hat trick - goal+assist+fight? (Yes or No)",
    "Pick a number between 1 and 99 and win points if you're closest to the first goal scorer's number without going over.",
    "Will more goals be scored by players with EVEN or ODD jersey numbers? (Even or Odd)",
    // "Will there be a goalie goal this game?",
    // "Will a goalie get pulled in the game?",
  ],
  dynamic: {
    prefix: ["Will there be"],
    body: [
      "a goal called back",
      "a fight (major penalty assigned)",
      // "a misconduct",
      "a goal in the first 5 mins",
      // "more goals scored by players with EVEN jersey numbers",
      // "more goals by Odd number players",
      // "a goal by a Defenseman",
      // "a shut out for either team",
      "a hat-trick",
      // "60 or more total shots",
      // "an unsuccessful Coaches Challenge",
      "a successful Coaches Challenge",
      // "score a power-play goal",
      // "score a short-handed goal",
      // "a Coaches Challenge",
    ],
    postfix: ["in the game (Yes or No)"], // "in the first period", "in the second period", "in the third period"],
  },
};
const BY_TEAM = {
  static: [],
  dynamic: {
    prefix: [
      "Which team will",
      // "Will the Home team",
      // "Will the Away team",
    ],
    body: [
      "win the opening face-off",
      "score the first goal",
      // "score the last goal",
      "have more total shots on goal",
      // "have more penalty minutes",
      // "break a stick first",
    ],
    postfix: ["(Home or Away)"],
  },
};

function composeOptions(collection, hasPostfix = true) {
  const prefixes = collection.prefix;
  const bodies = collection.body;
  const postfixes = collection.postfix;
  const composedOptions = [];

  bodies.forEach((b) => {
    prefixes.forEach((pre) => {
      if (hasPostfix) {
        postfixes.forEach((post) => {
          composedOptions.push(`${pre} ${b} ${post}?`);
        });
      } else {
        composedOptions.push(`${pre} ${b}?`);
      }
    });
  });
  return composedOptions;
}

/**
 *
 * @param {Number} n - Number of items to select
 * @param {Any[]} arr - An array of items from which to choose
 * @returns {Any[]} An array of the selected items
 */
function pickNofM(n, arr) {
  let set = [],
    cp = [...arr];

  for (let i = 0; i < n; i++) {
    let c = cp.splice(Math.floor(Math.random() * cp.length), 1);
    if (c === undefined) break; // over reached
    set.push(c[0]);
  }
  return set;
}

/**
 *
 * @param {Any[]} array - The array to shuffle
 * @returns {Any[]} A shuffled _copy_ of `array`
 *
 * https://bost.ocks.org/mike/shuffle/
 */
function shuffleIt(array, asCopy = false) {
  let a = asCopy ? [...array] : array,
    m = a.length,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    [a[m], a[i]] = [a[i], a[m]]; // swap
  }
  return a;
}

// Combine the static and dynamic options
const teamOptions = [...BY_TEAM.static, ...composeOptions(BY_TEAM.dynamic)];
const gameOptions = [...BY_GAME.static, ...composeOptions(BY_GAME.dynamic)];
const allOptions = [...teamOptions, ...gameOptions];

console.log(`5 points awarded for CORRECT answers. 0 points awarded for INCORRECT answers.\n==========`);
// allOptions.forEach((o, i) => console.log(`${(i + 1).toString().padStart(2, " ")}\t${o}`));
// pickNofM(7, allOptions).forEach((o, i) => console.log(`${(i + 1).toString().padStart(2, " ")}\t${o}`));
shuffleIt(pickNofM(1, allOptions)).forEach((o, i) => console.log(o));
