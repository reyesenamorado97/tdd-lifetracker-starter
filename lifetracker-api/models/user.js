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
        const requiredFields = [
            "username",
            "password",
            "first_name",
            "last_name",
            "email"
            
        ];
        // Error: if any fields are missing
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }
        
       
        // Error: if user with same email already exists
        const existingEmail = await User.fetchUserByEmail(credentials.email);
        if (existingEmail) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }

         const existingUsername = await User.fetchUserByUsername(credentials.username);
         if (existingUsername) {
             throw new BadRequestError(`Duplicate username: ${credentials.username}`);
         }
 
        // Take user password and hash it
        // Take user email and lowercase it
        const lowerCasedEmail = credentials.email.toLowerCase();

        // Create new user in database with all their info
        const result = await db.query(`
            INSERT INTO users (
                username,
                password,
                first_name,
                last_name,
                email
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, password, first_name, last_name, email, created_at, updated_at;
        `, [credentials.username, credentials.password, credentials.first_name, credentials.last_name, lowerCasedEmail])

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

    static async fetchUserByUsername(username) {
        if (!username) {
            throw new BadRequestError("No username provided");
        }
 
        const query = `SELECT * FROM users WHERE username = $1`;
 
        const result = await db.query(query, [username]);
 
        const user = result.rows[0];
 
        return user;
    }

}

module.exports = User

