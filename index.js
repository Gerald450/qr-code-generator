/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import { url } from "inspector";


inquirer
  .prompt([{ message: "Type the url: ", name: "url" }])
  .then((answers) => {
    const url = answers.url;
    var qr_png = qr.image(url, { type: "png" });

    qr_png.pipe(fs.createWriteStream("qr.png"));
    
    fs.writeFile('qr.txt', url, "utf-8", (err) => {
      if (err) throw err;
      console.log("Great!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log("great!");
    }
  });
