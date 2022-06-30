const db = require("../../db")
const { BadRequestError ,UnauthorizedError } = require("../utils/errors")

class User {
    static async login(credentials) {

        const requiredFields = ["email", "password"];
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
              throw new BadRequestError("Error! Please input an email and password.");
            }
          });

        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials) {
        // User should submit email, password
        const requiredFields = ["username", "password", "first_name", "last_name", "email"];
        // Error: if any fields are missing
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        })
       
        // Error: if user with same email already exists
        const existingUser = await User.fetchUserByEmail(credentials.email);
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }
 
        // Take user password and hash it
        // Take user email and lowercase it
        const lowerCasedEmail = credentials.email.toLowerCase();
 
        // Create new user in database with all their info
        const result = await db.query(`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                location,
                date
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email, password, first_name, last_name, location, date;
        `, [lowerCasedEmail, credentials.password, credentials.first_name, credentials.last_name, credentials.location, credentials.date])
        // Return user
        const user = result.rows[0];
 
        return user;
    }
 
    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }
 
        const query = `SELECT * FROM users WHERE email = $1`;
 
        const result = await db.query(query, [email.toLowerCase()]);
 
        const user = result.rows[0];
 
        return user;
    }

}

module.exports = User

