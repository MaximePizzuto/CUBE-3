const path = require("path");
const express = require("express");

const db = require("./config/db.js")
const port = 3000;

//app.use(express.static(path.join(__dirname, "..", "build")));
//app.use(express.static("public"));

// Start Express serveur on port choosed at const port
app.listen(port, () => {
    console.log("server started on port " + port);
  });