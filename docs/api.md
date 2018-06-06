# API Endpoints

## Players

### Path

`/api/players`

### Response

Response is always an array, even the is only one item or none.

By default returns last 20 players in collection.

```js
[
  {
    faceit: {
      nickname: String,
      id: String
    },
    twitch: {
      login_name: String,
      id: String,
      stream: {
        type: null | 'live',
        title: String,
        viewer_count: Number,
        started_at: String,
        thumbnail_url: String
      }
    },
    _id: String
  }
];
```

## Query Parameters

### twitch_id

`?twitch_id=<sometwitchid>[&twitch_id=<sometwitichid>]`

Returns one or more players with matching Twitch ID.

---

### stream

`?stream=<somestreamtype>`

Returns all players where current stream type matches query.

## Examples

`/api/players?stream=live`

Returns all players currently live streaming.

---

`/api/players?twitch_id=61985158`

Returns player with matching Twitch ID.

---

`/api/players?twitch_id=61985158&twitch_id=29924475`

Returns all players with matching Twitch ID.

---

`/api/players?twitch_id=61985158&twitch_id=29924475&stream=live`

Returns all live streaming players that match the supplied Twitch IDs.

## Matches

### Path

`/api/matches`

### Response

By default returns all matches that are starting, or have started (status not 'FINISHED').

```js
[
  {
    createdAt: Date,
    configured_at: Number | null,
    started_at: Number | null,
    match_id: String,
    game: String,
    region: String,
    competition_id: String,
    competition_name: String,
    status: 'CHECK_IN' | 'READY' | 'VOTING' | 'CAPTAINS_PICK'| 'ONGOING' | 'FINISHED',
    maps: [String] | null,
    teams: {
      faction1: {
        faction_id: String,
        name: String,
        leader: String,
        avatar: String,
        roster: [
          {
            player_id: String,
            nickname: String,
            avatar: String
          }
        ]
      },
      faction2: {
        faction_id: String,
        name: String,
        leader: String,
        avatar: String,
        roster: {
          player_id: String,
          nickname: String,
          avatar: String
        }
      }
    };
  }
]
```

## Query Parameters

### competition_id

`?competition_id=<somecompetitionid>[&competition_id=<somecompetitionid>`

Returns all running matches from the provided competition IDs (hub IDs).

## Examples

`/api/matches?competition_id=74caad23-077b-4ef3-8b1d-c6a2254dfa75`

Returns all running matches belonging to the competition with ID '74caad23-077b-4ef3-8b1d-c6a2254dfa75'.

---

`/api/matches?competition_id=74caad23-077b-4ef3-8b1d-c6a2254dfa75&competition_id=fd5780d5-dd2f-4479-906c-57b8e41ae9d7`

Returns all running matches belonging to the competitions with IDs '74caad23-077b-4ef3-8b1d-c6a2254dfa75' and 'Returns all running matches belonging to the competition with ID '74caad23-077b-4ef3-8b1d-c6a2254dfa75'.
