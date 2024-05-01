const BY_GAME = {
  static: [
    "Will the game go to Overtime? (Yes or No)",
    "Will a player be ejected from the game? (Yes or No)",
    "Will the 1st intermission interview be with a Forward or Defenseman?",
    "Will the total number of goals in the game be Even or Odd?",
    "Will someone get a Gordie Howe hat trick - goal+assist+fight? (Yes or No)",
    // "Will there be a goalie goal this game?",
    // "Will a goalie get pulled in the game?",
  ],
  dynamic: {
    prefix: ["Will there be"],
    body: [
      "a goal called back",
      "a fight",
      "a misconduct",
      "a goal in the first 5 mins",
      "more goals by Even number players",
      "more goals by Odd number players",
      "a goal by a Defenseman",
      "a shut out for either team",
      "a hat-trick",
      "60 or more total shots",
      "an unsuccessful Coaches Challenge",
      "a successful Coaches Challenge",
      "score a power-play goal",
      "score a short-handed goal",
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
      "score the last goal",
      "have more total shots on goal",
      "have more penalty minutes",
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

// Combine the static and dynamic options
const teamOptions = [...BY_TEAM.static, ...composeOptions(BY_TEAM.dynamic)];
const gameOptions = [...BY_GAME.static, ...composeOptions(BY_GAME.dynamic)];
const allOptions = [...teamOptions, ...gameOptions];

// allOptions.forEach((o, i) => console.log(`${i + 1}\t${o}`));
pickNofM(5, allOptions).forEach((o, i) => console.log(`${i + 1}\t${o}`));
