const Ads = require("../models/adsModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const path = require("path");
const fileUpload = require("express-fileupload");

exports.createAd = async (req, res, next) => {

  const ad = new Ads({
    title: req.body.title,
    gender: req.body.gender,
    age: req.body.age,
    description: req.body.description,
    user: req.body.user,
    timeReq: req.body.timeReq
  })

  if (req.file) {
    ad.image = req.file.path
  }

  ad.save()
    .then(response => {
      res.json({
        message: "Ad created successfully"
      })
    })
    .catch(error => {
      res.json({ message: "Error!" })
    })
}



