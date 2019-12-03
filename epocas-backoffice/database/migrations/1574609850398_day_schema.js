"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DaySchema extends Schema {
	up() {
		this.create("days", table => {
			table.increments();
			table.timestamp("date").notNullable();
			table.text("sentence");
			table.string("sentence_author", 100);
			table.text("pray");
			table.text("reflection");
			table.string("photo_path", 150);
			table.string("photo_name", 70);
			table
				.integer("occasion_id")
				.unsigned()
				.references("id")
				.inTable("occasions")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			table.timestamps();
		});
	}

	down() {
		this.drop("days");
	}
}

module.exports = DaySchema;
