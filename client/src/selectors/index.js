import { createSelector } from 'reselect';

export const matches = state => state.matches;
export const streamers = state => state.streamers;

export const matchesByHub = createSelector(matches, matches => {
  const items = matches.items.reduce((obj, item) => {
    const { competition_name } = item;
    obj[competition_name]
      ? (obj[competition_name] = [...obj[competition_name], item])
      : (obj[competition_name] = [item]);
    return obj;
  }, {});
  return { ...matches, items };
});
