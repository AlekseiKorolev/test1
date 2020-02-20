const memoryCache = require("memory-cache");
const mCache = new memoryCache.Cache();

module.exports = duration => {
  return (req, res, next) => {
    const key = "__express__" + req.originalUrl || req.url;
    const cacheContent = mCache.get(key);
    if (cacheContent) {
      res.send(cacheContent);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        mCache.put(key, body, duration);
        res.sendResponse(body);
      };
      next();
    }
  };
};
