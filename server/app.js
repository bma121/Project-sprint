const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const pastSprint = require("./models/pastSprint");
const logger = require('./graylogger');

const app = express();

mongoose
  .connect(
    "mongodb://localhost:27017/sprintDB")
  .then(() => {
    console.log("Connected to database!");
    logger.log('Database Connected');
  })
  .catch(() => {
    console.log("Connection failed!");
    logger.log('Connection to Database failed');
  });
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/sprint", (req, res, next) => {
  const sprint = new pastSprint ({
    length: req.body.length,
    status: req.body.status,
    createdAt: req.body.createdAt,
    startedAt: req.body.startedAt,
    finishedAt: req.body.finishedAt,
    description: req.body.description
  });
  sprint.save().then(createdSprint => {
    res.status(201).json({
      message: "Sprint added successfully",
      sprintId: createdSprint._id
    });
    logger.log('Sprint added successfully');
  });
});

app.get("/api/sprint", (req, res, next) => {
  pastSprint.find().then(documents => {
    res.status(200).json({
      message: "Sprints fetched successfully!",
      sprints: documents
    });
    logger.log('Sprint fetched successfully');
  });
});

app.delete("/api/sprint", (req,res ,next ) => {

  console.log('delete all data!!!!');

  pastSprint.deleteMany().then(result => {

  res.status(200).json({message:"All sprint deleted!!!"});
  });
  logger.log('Sprint deleted successfully');
});

module.exports = app;
