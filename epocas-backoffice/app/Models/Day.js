"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");

class Day extends Model {
  static get computed() {
    return ["url"];
  }

  getUrl() {
    return `${Env.get("APP_URL")}/images/day-${this.id}.png`;
  }
  occasion() {
    return this.belongsTo("App/Models/Occasion");
  }
}

module.exports = Day;
