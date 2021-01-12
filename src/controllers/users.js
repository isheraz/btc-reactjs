const UUID = require('uuid');
const db = require('../node-client');
const roles = require('../modules/roles');

const COL_NAME = 'users';

// create new user with provided data
exports.create = async (req, res) => {
  try {
    const roleExist = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    if (!roleExist.call(roles, req.query.role)) {
      res.status(422).send(`Valid roles values are: ${Object.keys(roles)}`);
      return;
    }
    const name = req.query.name || 'ahmad';
    const role = req.query.role || 'user';
    const uuid = UUID.v1();
    await db.collection(COL_NAME).add({
      name,
      role,
      uuid,
    });
    res.send(`User created with role: ${role} and UUID => ${uuid}`).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
};

// get all the users from collection
exports.getAll = async (req, res) => {
  try {
    const users = await db.collection(COL_NAME).get();
    const result = [];
    users.forEach((doc) => {
      result.push(doc.data());
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
