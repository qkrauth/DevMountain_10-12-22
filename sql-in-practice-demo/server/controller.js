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
        FROM cc_clients AS c
        JOIN cc_users AS u
        ON c.user_id = u.user_id
        WHERE u.user_id = ${userId};
        `)
        .then(dbRes => {
            console.log(dbRes);
            res.status(200).send(dbRes[0]);
        })
        .catch(err => console.log(err));
    },

    getOneUser: (req, res) => {
       sequelize.query(`
       SELECT first_name AS name, email
       FROM cc_users
       WHERE user_id = ${userId};
       `) 
       .then(dbRes => {
            console.log(dbRes);
            res.send("ok")
       })
       .catch(err => console.log(err))
    },
    // req.body is the information being filled out on the FORM - front end.
    postUser: (req, res) => {
        console.log(req.body);
        // destructure req.body so we can use the individual values
        const {
            first_name,
            last_name,
            email,
            phone_number
        } = req.body

        sequelize.query(`
        INSERT INTO cc_users (first_name, last_name, email, phone_number)
        VALUES ('${first_name}', '${last_name}', '${email}', '${phone_number}');
        `)
        .then(dbRes => {
           console.log(dbRes); 
           res.send("ok")
        })
        .catch(err => console.log(err))
    },

    deleteUser: (req, res) => {
        const {id} = req.params;
        sequelize.query(`
        DELETE
        FROM cc_users
        WHERE user_id = ${id}
        `)
        .then(dbRes => {
            console.log(dbRes);
            res.send("ok")
        })
        .catch(err => console.log(err))
    }
}