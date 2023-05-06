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

exports.getAllAds = async (req, res) => {
  try {
    const allAds = await Ads.find().populate("user", "shopname");
    res.json(allAds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.changeAdStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const ads = await Ads.findById(id);

    if (ads.status === "active") {
      ads.status = "inactive";
    } else if (ads.status === "inactive") {
      ads.status = "pending";
    } else if (ads.status == "pending") {
      ads.status = "active";
    }
    const updateStatusAd = await ads.save();
    res.status(200).json({ message: "Ads Status Updated Successfully", ads: updateStatusAd });

  } catch (error) {
    res.status(200).json({ message: "Error Updating Ads Status", error });
  }
}

exports.rejectAd = async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Ads.findById(id);
    if (ad.status === "pending") {
      ad.status = "inactive";
      await ad.save();
    }
    res.json(ad);
  } catch (error) {
    res.status(200).json({ message: "Error Updating Ads Status", error });
  }
}




