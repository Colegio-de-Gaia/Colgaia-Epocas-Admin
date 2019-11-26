"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OccasionSchema extends Schema {
  up() {
    this.create("occasions", table => {
      table.increments();
      table.string("name").notNullable();
      table.timestamp("start_at").notNullable();
      table.timestamp("end_at").notNullable();
      table.text("description").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("occasions");
  }
}

module.exports = OccasionSchema;
