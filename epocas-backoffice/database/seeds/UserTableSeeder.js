"use strict";

/*
|--------------------------------------------------------------------------
| UserTableSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use("App/Models/User");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UserTableSeeder {
  async run() {
    const user = new User();

    user.username = "Admin";
    user.email = "admin@admin.com";
    user.password = "password";

    await user.save();
  }
}

module.exports = UserTableSeeder;
