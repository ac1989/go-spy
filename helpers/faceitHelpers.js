module.exports.transduceMatchToSchema = match => {
  const {
    configured_at,
    started_at,
    match_id,
    game,
    region,
    competition_id,
    competition_name,
    status,
    teams
  } = match;
  const { faction1, faction2 } = teams;

  let maps = null;
  // determne values based on status

  if (status === 'ONGOING' || status === 'FINISHED') {
    maps = match.voting.map.pick;
  }

  const roster1 = faction1.roster.map(player => {
    let { player_id, nickname, avatar } = player;
    return { player_id, nickname, avatar };
  });

  const roster2 = faction2.roster.map(player => {
    let { player_id, nickname, avatar } = player;
    return { player_id, nickname, avatar };
  });

  return {
    configured_at,
    started_at,
    match_id,
    game,
    region,
    competition_id,
    competition_name,
    status,
    maps,
    teams: {
      faction1: {
        faction_id: faction1.faction_id,
        name: faction1.name,
        leader: faction1.leader,
        avatar: faction1.avatar,
        roster: roster1
      },
      faction2: {
        faction_id: faction2.faction_id,
        name: faction2.name,
        leader: faction2.leader,
        avatar: faction2.avatar,
        roster: roster2
      }
    }
  };
};
