"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Occasion = use("App/Models/Occasion");

/**
 * Resourceful controller for interacting with occasions
 */
class OccasionController {
  /**
   * Show a list of all occasions.
   * GET occasions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const occasions = Occasion.all();

    return occasions;
  }

  /**
   * Create/save a new occasion.
   * POST occasions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["name", "start_at", "end_at", "description"]);

    const occasion = await Occasion.create({ ...data });

    return occasion;
  }

  /**
   * Display a single occasion.
   * GET occasions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const occasion = await Occasion.findOrFail(params.id);

    await occasion.load("days");

    return occasion;
  }

  /**
   * Update occasion details.
   * PUT or PATCH occasions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const occasion = await Occasion.findOrFail(params.id);

    const data = request.only(["name", "start_at", "end_at", "description"]);

    occasion.merge(data);

    await occasion.save();

    return occasion;
  }

  /**
   * Delete a occasion with id.
   * DELETE occasions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const occasion = await Occasion.findOrFail(params.id);

    await occasion.delete();
  }
}

module.exports = OccasionController;
