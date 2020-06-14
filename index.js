const express = require("express");
const path = require("path");

const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./model/contacts");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static("assets"));

let contactList = [
  {
    name: "Arun",
    phone: "1234"
  },
  {
    name: "David",
    phone: "4321"
  }
];

app.get("/", function(req, res) {
  res.render("home", {
    title: "Welcome",
    contact_list: contactList
  });
});

app.post("/create", function(req, res) {
  contactList.push(req.body);
  res.redirect("/");
});

app.get("/playground", function(req, res) {
  res.render("practice", {
    title: "Playground",
    heading: "This is really cool",
    contact_list: contactList
  });
});

app.get("/delete-contact/:phone", function(req, res) {
  let phone = req.params.phone;
  let index = contactList.findIndex(contact => contact.phone == phone);
  if (index != -1) {
    contactList.splice(index, 1);
  }
  res.redirect("/");
});

app.listen(port, function(err) {
  if (err) {
    console.log("Error starting server");
  } else console.log("Server started on port " + port);
});
