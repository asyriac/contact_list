const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactlistdb", { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to DB"));
db.once("open", function() {
  console.log("Establised connection to the database");
});
