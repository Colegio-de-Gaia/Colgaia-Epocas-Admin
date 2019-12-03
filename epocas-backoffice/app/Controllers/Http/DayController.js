"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Day = use("App/Models/Day");

/**
 * Resourceful controller for interacting with days
 */
class DayController {
	/**
	 * Show a list of all days.
	 * GET days
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const days = Day.all();

		return days;
	}

	/**
	 * Create/save a new day.
	 * POST days
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
		const data = request.only([
			"date",
			"sentence",
			"sentence_author",
			"photo_author",
			"reflection",
			"pray",
			"occasion_id"
		]);

		const day = await Day.create({ ...data });

		return day;
	}

	/**
	 * Display a single day.
	 * GET days/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
		const day = await Day.findOrFail(params.id);

		await day.load("occasion");

		return day;
	}

	/**
	 * Update day details.
	 * PUT or PATCH days/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {
		const data = request.only([
			"date",
			"sentence",
			"sentence_author",
			"photo_author",
			"pray",
			"reflection",
			"occasion_id"
		]);
	}

	/**
	 * Delete a day with id.
	 * DELETE days/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
		const day = await Day.findOrFail(params.id);

		await day.delete();
	}
}

module.exports = DayController;
