/*
|--------------------------------------------------------------------------
| CompanySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Company = use('App/Models/Company');
const Anything = use('Anything');
const Helpers = use('Helpers');

/* eslint-disable */
const feeds = require(`${Helpers.appRoot('xyz/seeds/company')}`); 

const Promise = use('bluebird');

const ObjectID = require('mongodb').ObjectID

const Database = use('Database');
const Config = use('Config');

class CompanySeeder {
  async run () {
    await Promise.each(feeds, async (value) => {
      const data = {
        name: value.name,
        url: value.url
      };      

      if (value.parent) {
        let discover = await Company.where({name: value.parent}).first();
        if (discover) {
          discover = discover.toJSON();
          data.parent = ObjectID(Company._id);
        }      
      } else {
        data.parent = null;
      }
      const comp = new Company(data);
      await comp.save();
      await this.updateCompany(comp._id);
    });
  }

  async updateCompany(id) {    
    const db = await Database.connect()
    const collection = Config.get('xyz.company');                
    const { Data } = await Anything.callUnknown(id);        
    const hash = Data.hash;
    let test = Anything.doStuff(`${id}`, hash);
    test = `${test.buffer}~${test.data}`;
    await db.collection(collection)
      .findOneAndUpdate(
        {_id: ObjectID(id)},
        {$set: { test}}
    );
  }
}

module.exports = CompanySeeder
