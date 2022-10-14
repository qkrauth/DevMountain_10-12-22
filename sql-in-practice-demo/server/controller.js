const Sequelize = require("sequelize");
require("dotenv").config()

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const userId = 4;
const clientId = 3;

module.exports = {
    getUserInfo: (req, res) => {
        sequelize.query(`
        SELECT *
        FROM cc_clients
        JOIN cc_users
        ON cc_users.user_id = cc_clients.user_id
        WHERE cc_users.user_id = ${userId};
        `)
        .then(dbRes => {
            console.log(dbRes);
            res.status(200).send(dbRes[0]);
        })
        .catch(err => console.log(err));
    }
}