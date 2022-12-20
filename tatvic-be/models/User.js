"use strict";
const { DataTypes } = require("sequelize");
const sequlize = require("../config/database.config");

const Users = sequlize.define(
  "users",
  {
    userId: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: { allowNull: false, type: DataTypes.STRING },
    username: { allowNull: false, type: DataTypes.STRING },
    profilePic: { type: DataTypes.STRING },
    googleUserId: { allowNull: false, type: DataTypes.STRING },
  },
  { underscored: true }
);

module.exports = Users;
