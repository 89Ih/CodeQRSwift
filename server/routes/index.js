const express = require("express");
const router = express.Router();
const { CRUDService } = require("../db/firebaseDB");
const { Timestamp } = require('firebase/firestore');

/* GET aLL Offices */
router.get("/", async (req, res) => {
  await CRUDService.readData("office")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});
// Get office by Id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  CRUDService.readData("office")
    .then((response) => {
      const filterd = response.find(({ officeId }) => {
        return officeId === id;
      });
      res.json(filterd);
    })
    .catch((err) => {
      console.error(err);
    });
});
// Get all Devices
router.get("/devices/all", async function (req, res) {
  await CRUDService.readData("devices")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});
// Get all assigned devices
router.get("/location/:id", (req, res) => {
  const { id } = req.params;
  CRUDService.readData("devices")
    .then((response) => {
      const filterd = response.filter(({ officeNr }) => {
        return officeNr === id;
      });
      res.json(filterd);
    })
    .catch((err) => {
      console.error(err);
    });
});
// Get device by Id
router.get("/device/:id", (req, res) => {
  const { id } = req.params;
  CRUDService.readData("devices")
    .then((response) => {
      const filterd = response.find(({ deviceId }) => {
        return deviceId === id;
      });
      res.json(filterd);
    })
    .catch((err) => {
      console.error(err);
    });
});
// Assign/Unassign a device to office
router.put("/device/:id", async (req, res) => {
  const { id } = req.params;
  const { officeNr } = req.body;
  console.log(id);
  console.log(officeNr);
  try {
    return await CRUDService.updateData("devices", { officeNr: officeNr }, id).then((response)=>{
    res.status(201).json({response,msg:"successfuly updated"})
    });
  } catch (error) {
    console.error(error);
  }
});
// declare office as configured record
router.post("/offices", async (req, res) => {
  const generatedDocId = require("crypto").randomBytes(10).toString("hex");
  let { department, floor, building } = req.body;
  let data = {
    officeId: generatedDocId,
    department,
    floor,
    building,
    officeNr: building + floor + department,
  };
  await CRUDService.createData("office", data, generatedDocId)
    .then(() => res.json(data))
    .catch((err) => console.error(err));
});
router.post("/devices", async (req, res) => {
  return  await CRUDService.readData('devices').then(async (response) => {
    let arrCounter = []
    response.forEach(({ deviceId }) =>{ 
      console.log(deviceId);
     let onlyNumber= deviceId.slice(1)
      arrCounter.push(onlyNumber)
    })
    const lstIdx = arrCounter.sort()
    const preparedId = parseInt(lstIdx.at(-1)) + 1
    const finialId = preparedId >= 10 ? `D${preparedId}` : `D0${preparedId}`;
    setIcon = !req.body.icon ? req.body.deviceName : req.body.icon
    let obj = {
      deviceId: finialId,
      deviceName: req.body.deviceName,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      serial_number: req.body.serial_number,
      officeNr: req.body.officeNr,
      status: req.body.status,
      icon: setIcon,
      purchaseDate: Timestamp.fromDate(new Date(req.body.purchaseDate)),
      warrantyExpiry: Timestamp.fromDate(new Date(req.body.warrantyExpiry)),
    };
  return await CRUDService.createData("devices", obj, finialId).then((objData)=>{
    res.status(201).json({
      objData,
      msg:"A new device has been successfully created. Click the QR code below to download it.",
      generatedQr:obj.serial_number
    })
  });
  }).catch((err) => console.error(err));
});
module.exports = router;
