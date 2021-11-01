const mongoose = require("mongoose");
module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://basel:basel@cluster0.n5tsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log("Connect with mongoDB with successfully"))
    .catch((err) => console.log(err));
};