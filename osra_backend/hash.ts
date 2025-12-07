const bcrypt = require("bcryptjs");

const password = "123456"; // You can change this to any password you want
const hashed = bcrypt.hashSync(password, 10);

console.log("Hashed Password:", hashed);

