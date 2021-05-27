"use strict";

const lib = require("../lib");
const express = require("express");
const cors = require("cors");
const configuration = lib.Configuration;
const controller = lib.MailSendController;

let router = express.Router();

router.use(cors());
router.use(express.json());

configuration.apiKey = "6c31f7cc1c5d0120c32341fe7a313c9b";

router
  .route("/")
  .get((req, res) => {
    console.log("API Successfully Hit!");
    res.status(200).json({ status: "success" });
  })
  .post((req, res) => {
    let emailBody = new lib.Send();

    emailBody.from = new lib.From();
    emailBody.from.email = req.body.fromEmail;
    emailBody.from.name = req.body.fromName;
    emailBody.subject = req.body.subject;

    emailBody.content = [];
    emailBody.content[0] = new lib.Content();
    emailBody.content[0].type = lib.TypeEnum.HTML;
    emailBody.content[0].value = unescape(req.body.htmlBody);

    emailBody.personalizations = [];
    req.body.toEmails.forEach((toEmail, index) => {
      emailBody.personalizations[index] = new lib.Personalizations();
      emailBody.personalizations[index].to = [];
      emailBody.personalizations[index].to[0] = new lib.EmailStruct();
      emailBody.personalizations[index].to[0].email = toEmail;
    });
    emailBody.tags = ["campaign"];

    const promise = controller.createGeneratethemailsendrequest(emailBody);

    promise.then(
      (response) => {
        console.log(response);
        res.status(200).json(response);
      },
      (err) => {
        console.log(err);
        res.status(400).json(err);
      }
    );
  });

module.exports = router;
