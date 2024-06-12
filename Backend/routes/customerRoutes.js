const { Router } = require("express");
const customerController = require("../controllers/customerController");

const router = Router();

router.post("/submitpersonaldetails", customerController.submitPersonalDetails);

module.exports = router;