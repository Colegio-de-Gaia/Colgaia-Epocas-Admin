"use strict";

const Day = use("App/Models/Day");
const Helpers = use("Helpers");

class DayImageController {
  /**
   * Create/Save a new image
   * POST days
   */
  async store({ params, request }) {
    const day = await Day.findOrFail(params.id);

    const image = request.file("image", {
      types: ["image"],
      size: "2mb",
      extnames: ["png"]
    });

    await image.move(Helpers.tmpPath("uploads"), {
      name: `day-${day.id}.png`,
      overwrite: true
    });

    if (!image.moved()) {
      return image.error();
    }

    day.photo_path = image.fileName;

    await day.save();

    return day;
  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`));
  }
}

module.exports = DayImageController;
