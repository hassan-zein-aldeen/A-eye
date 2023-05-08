const Ad = require("../models/adsModel");
const User = require("../models/userModel");


exports.createAd = async (req, res, next) => {
  const { title, gender, age, description, user } = req.body;

  const relatedUser = await User.findOne({ _id: user });

  try {

    if (relatedUser.status === "inactive") {

      return res.json({ message: "Deactivated Users can't create Ads" });
    }

    const userReqAd = new Ad();
    userReqAd.title = title;
    userReqAd.gender = gender;
    userReqAd.age = age;
    userReqAd.description = description;
    userReqAd.user = user;

    if (req.file) {
      userReqAd.image = req.file.path
    }

    await userReqAd.save();
    res.status(201).json({ message: "Ad created successfully!", userReqAd });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }

}

exports.getAllAds = async (req, res) => {
  try {
    const allAds = await Ad.find().populate("user", "shopname");
    res.json(allAds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getUserAds = async (req, res) => {
  const { id } = req.params;
  try {
    const userAds = await Ad.find({ user: id }).exec();
    res.status(200).json(userAds);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.deactivateAd = async (req, res) => {
  const { id } = req.params;

  try {
    const ads = await Ad.findById(id);
    if (ads.status === "active" || ads.status == "pending") {
      ads.status = "inactive";
    }
    const updateStatusAd = await ads.save();
    return res.status(200).json({ message: "Ads Status Updated Successfully", ads: updateStatusAd });
  } catch (error) {
    res.status(200).json({ message: "Error Updating Ads Status", error });
  }
}

exports.getCondAds = async (req, res) =>{
  const {gender, age} = req.body;
  console.log(gender);
  console.log(age);

  try{
    const adsResult = await Ad.find({ gender: gender, age: age, status: "active" });
    res.status(200).json(adsResult);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.adminDeactivateAd = async (req, res) => {
  const { id } = req.params;

  try {
    const ads = await Ad.findById(id);
    if (ads.status === "active") {
      ads.status = "inactive";
    }
    const updateStatusAd = await ads.save();
    return res.status(200).json({ message: "Ads Status Updated Successfully", ads: updateStatusAd });
  } catch (error) {
    res.status(200).json({ message: "Error Updating Ads Status", error });
  }
}

exports.requestInactive = async (req, res) => {
  const { id } = req.params;

  try {
    const ads = await Ad.findById(id);
    if (ads.status === "inactive") {
      ads.status = "pending";
    }
    const updateStatusAd = await ads.save();
    res.status(200).json({ message: "Ads Status Updated Successfully", ads: updateStatusAd });
  } catch (error) {
    res.status(200).json({ message: "Error Updating Ads Status", error });
  }
}


exports.acceptRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Ad.findById(id);
    if (ad.status === "pending") {
      ad.status = "active";
      await ad.save();
    }
    res.json(ad);
  } catch (error) {
    res.status(200).json({ message: "Error Updating Ads Status", error });
  }
}

exports.rejectRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const ads = await Ad.findById(id);
    if (ads.status == "pending") {
      ads.status = "rejected";
    }
    const updateStatusAd = await ads.save();
    res.status(200).json({ message: "Ads Status Updated Successfully", ads: updateStatusAd });
  } catch (error) {
    res.status(200).json({ message: "Error Updating Ads Status", error });
  }
}





