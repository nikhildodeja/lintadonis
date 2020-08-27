class EntryController {
    async test({ request, response }) {
        console.log(request); // eslint-disable-line
        response.send('Hello World');
    }
}
module.exports = EntryController;
