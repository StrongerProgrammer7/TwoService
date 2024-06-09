// @ts-nocheck
const Router = require('express');
const router = new Router();
const actionUser = require("../models/Api/actionUser");
const historyUser = require("../models/Api/getActionUser");

router.post("/action_user", actionUser);
router.get("/action_user/:id", historyUser);

module.exports = router;
