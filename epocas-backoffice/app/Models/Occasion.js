"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Occasion extends Model {
  days() {
    return this.hasMany("App/Models/Day");
  }
}

module.exports = Occasion;
