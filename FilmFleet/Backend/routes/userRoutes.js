const express = require('express');
const route = express.Router();

const { getRegisterDetails, getLogInDetails, } = require("../controllers/userController");

route.post('/register', getRegisterDetails);
route.post('/login', getLogInDetails);

module.exports = route;