const User = use('App/Models/User');

const ObjectID = require('mongodb').ObjectID; // eslint-disable-line

class EntryController {
    async test({ request, response }) {
        const data = request.all();
        data.companyId = request.companyId;
        const user = new User(data);
        await user.save();
        response.send('saved successfully');
    }

    async login ({ request, response, auth }) {
        let data = null;
        await auth.logout();
        const { email, password } = request.all();
        data = await auth.authenticator('jwt').withRefreshToken().attempt(email, password);
        data.user = await User.findBy({ email });
        data.user = data.user.toObject();
        delete data.user.password;
        response.send(data);
    }
}
module.exports = EntryController;
