"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/sessions", "SessionController.create");

Route.resource("api/occasions", "OccasionController")
  .apiOnly()
  .middleware(new Map([[["store", "update", "destroy"], ["auth"]]]));

Route.resource("api/days", "DayController")
  .apiOnly()
  .middleware(new Map([[["store", "update", "destroy"], ["auth"]]]));

Route.get("images/:path", "DayImageController.show");

Route.post("api/days/:id/image", "DayImageController.store").middleware("auth");

Route.get("api/current/occasion", "OccasionController.current");
