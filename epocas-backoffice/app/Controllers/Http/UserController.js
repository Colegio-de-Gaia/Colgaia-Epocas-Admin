'use strict'
const User = use('App/Models/User')

class UserController {

    async store({ request }) {

        const data = request.only(['user', 'email', 'password'])

        const userExists = await User.findBy('')
    }

}

module.exports = UserController
