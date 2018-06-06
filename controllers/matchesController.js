const mongoose = require('mongoose');
const FaceitMatch = mongoose.model('faceitmatches');

const filtersFromQuery = queries => {
  return Object.keys(queries).reduce((mongooseQuery, query) => {
    switch (query) {
      case 'competition_id':
        Array.isArray(query)
          ? (mongooseQuery[query] = { $in: queries[query] })
          : (mongooseQuery[query] = queries[query]);
        break;
      case 'match_id':
        mongooseQuery[query] = queries[query];
        break;
      case 'status':
        queries[query] === 'ongoing'
          ? (mongooseQuery['status'] = { $nin: ['CANCELLED', 'FINISHED'] })
          : null;
        break;
    }
    console.log(mongooseQuery);
    return mongooseQuery;
  }, {});
};

module.exports.get = async (req, res, next) => {
  const excludes = [{ status: 'CANCELLED' }];
  let matches = await FaceitMatch.find(filtersFromQuery(req.query));
  res.send(matches);
};
