export const OPTS = { timeout: 3000 };

export const flattenMatches = matches => {
  return matches.map(match => {
    let flattenedMatch = {
      ...match,
      team1: match.teams.faction1,
      team2: match.teams.faction2
    };
    delete flattenedMatch.teams;
    return flattenedMatch;
  });
};
