const express = require('express');
const app = express();
const { spawn } = require('child_process');
const { exec } = require('child_process');
const axios = require('axios');
const mongoose = require('mongoose');
require("dotenv").config();
app.use(express.json());

const Ad = require("../A-Eye/A-eye/backend/models/adsModel");

let currentWindow = null;


function runPythonScript() {
  const pythonProcess = spawn('python', ['main.py']);
  let result = '';
  let genderValue = '';
  let ageValue = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString().trim();
    const lines = result.split('\n');

    for (const line of lines) {
      const [variable, value] = line.split(':').map((s) => s.trim());

      if (variable === 'maxGenderPred') {
        genderValue = value;
        if (genderValue !== '') {
          console.log(genderValue);
        }
      } else if (variable === 'maxAgePred') {
        ageValue = value;
        console.log(ageValue);
      }
    }
  });

  pythonProcess.on('close', () => {

    var images = ["", "", "http:"];
    const html = generateHTML(images);
    openBrowserWindow(html);


    console.log('Python script finished');
    console.log(`Final gender value: ${genderValue}`);
    console.log(`Final age value: ${ageValue}`);
    console.log(`The type is: ${typeof ageValue}`);

    if (ageValue === "(0-2)" || ageValue === "(4-6)" || ageValue === "(8-12)") {
      ageValue = "(4-12)"
    }
    else if (ageValue === "(15-20)" || ageValue === "(25-32)" || ageValue === "(38-43)" || ageValue === "(48-53)" || ageValue === "(60-100)") {
      ageValue = "(12-53)"
    }
    if (genderValue !== '' && ageValue !== '') {
      getDetectedAds(genderValue, ageValue);
    }
  });
}

const getRelatedAds = async (req, res) => {
  const { age, gender } = req.body;
  try {
    const shownAds = await Ad.find({ gender: gender, age: age, status: "active" });
    res.status(200).json(shownAds);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
module.exports.getRelatedAds = getRelatedAds;

app.post('/', getRelatedAds)

function getDetectedAds(gender, age) {
  console.log("gender inside axios", gender);
  console.log("age inside axios", age);

  const API_URL = 'http://localhost:3000/ads/getCondAds';

  axios
    .post(API_URL, { gender, age })
    .then((response) => {
      console.log('API call successful:', response.data);
      const runAd = response.data;
      var htmlImages = "";
      for (let i = 0; i < runAd.length; i++) {
        htmlImages += `<li style="background-image:url('http://localhost:3000/uploads/` + runAd[i].image + `')"> </li>`;

        console.log(runAd[i].title); // Output: my first ad
        console.log(runAd[i].description); // Output: my first ad request
        console.log(runAd[i].age); // Output: (12-53)
      }

      // Open a new browser window and display the images as HTML
      const html = generateHTML(htmlImages);
      openBrowserWindow(html);

    })
    .catch((error) => {
      console.error('API call failed:', error);
      // Handle the error appropriately
    });
}

function generateHTML(images) {
  // Generate the HTML to display the images
  let html =
    `
  <html>

  <head>
    <link rel="stylesheet" href="plugins.css">
    <link rel="stylesheet" href="custom.css">
  </head>
  
  <body>
  
    <div class="homePageSlider gallery">
      <ul class="owl-carousel">
        `+images+`
      </ul>
    </div>
  
  
  
  </body>
  
  <script src="jquery-3.4.1.min.js"></script>
  <script src="javascriptPlugins.js"></script>
  <script src="functions.js"></script>
  
  
  
  </html>
  `;

  return html;
}

function openBrowserWindow(html) {
  // Write the HTML to a temporary file
  const tempFile = 'AEye.html';
  require('fs').writeFileSync(tempFile, html);

  // Open the temporary file in a new browser window
  const command =
    process.platform === 'win32'
      ? `start "" "${tempFile}"`
      : process.platform === 'darwin'
        ? `open "${tempFile}"`
        : `xdg-open "${tempFile}"`;
  exec(command, (error) => {
    if (error) {
      console.error('Failed to open browser window:', error);
    }
  });
}

runPythonScript();

setInterval(runPythonScript, 40000);

app.listen(8000, () => {
  console.log('Server listening on port 8000');
  require("./configs/db.config");
});
