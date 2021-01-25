module.exports = {
  MongoURI: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`,
};
