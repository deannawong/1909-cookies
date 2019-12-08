const Sequelize = require("sequelize");
const connection = require("../connection");

const { STRING, UUID, UUIDV4 } = Sequelize;

const User = connection.define("user", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  username: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  }
});
module.exports = { User };
