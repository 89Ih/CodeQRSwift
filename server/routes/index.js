var express = require("express");
var router = express.Router();
var path = require("path");
/////(*_*)\\\\\
var _dir_DB = path.join(__dirname, "../db/qrswift.db");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(_dir_DB);
/* GET aLL Offices */
router.get("/", function (req, res) {
  db.all("SELECT * FROM office", [], (err, items) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(items);
  });
});
// Get office by Id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    db.all("SELECT * FROM office WHERE officeId=?", [id], (err, items) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(items);
    });
  } catch (error) {
    console.error(error);
  }
});
// Get all Devices
router.get("/devices/all", function (req, res) {
  db.all("SELECT * FROM devices", [], (err, items) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(items);
    return res.json(items);
  });
});
// Get all assigned devices
router.get("/location/:id", (req, res) => {
  const { id } = req.params;
  try {
    db.all("SELECT * FROM devices WHERE officeNr=?", [id], (err, items) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(items);
    });
  } catch (error) {
    console.error(error);
  }
});
// Get device by Id
router.get("/device/:id", (req, res) => {
  const { id } = req.params;
  try {
    db.all("SELECT * FROM devices WHERE deviceId=?", [id], (err, items) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(items);
    });
  } catch (error) {
    console.error(error);
  }
});
// Assign/Unassign a device to office
router.put("/device/:id", (req, res) => {
  const { id } = req.params;
  const { officeNr } = req.body;
  try {
    db.all(
      `UPDATE devices SET officeNr=? WHERE deviceId=?`,
      [officeNr, id],
      (err, items) => {
        if (err) {
          return console.error(err.message);
        }
        res.json(items);
      }
    );
  } catch (error) {
    console.error(error);
  }
});
// declare office as configured record
router.post("/offices", (req, res) => {
  let { officeNr, department, floor, building, officeId } = req.body;
  officeNr= building+floor+department
  db.run(
    `INSERT INTO office (officeNr, department, floor, building, officeId) VALUES (?, ?, ?, ?, ?)`,
    [officeNr, department, floor, building, officeId],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).send("Office added successfully");
    }
  );
});

module.exports = router;
