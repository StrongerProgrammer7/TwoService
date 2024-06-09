// @ts-nocheck
const Router = require('express');
const router = new Router();
const insertUser = require("../models/Api/createUser");
const editUser = require("../models/Api/editUser");
const getUsers = require("../models/Api/getUsers");
router.post("/create_user", insertUser);
router.put("/edit_user/:id", editUser);
router.get("/users", getUsers);
module.exports = router;
