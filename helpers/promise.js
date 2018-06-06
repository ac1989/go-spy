module.exports.delay = time => {
  return new Promise(res => setTimeout(() => res(), time));
};

module.exports.retry = async (func, ...rest) => {
  for (let i = 0; i < 5; i++) {
    try {
      let res = await func(...rest);
      return res;
    } catch (err) {
      if (i < 4) {
        console.warn(err.message);
        this.delay(500);
      } else {
        console.warn('Failed after 5 retries.');
      }
    }
  }
};
