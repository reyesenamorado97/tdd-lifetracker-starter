const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

const db = require("../db")
const { BadRequestError ,UnauthorizedError } = require("../utils/errors")

class User {

    

    static makePublicUser(user) {
        return {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_at: user.created_at
        }
      }
    static async login(credentials) {
  
    const requiredFields = ["email", "password"];
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`);
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);
        
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
          return User.makePublicUser(user);
      }
    }

    throw new UnauthorizedError("Invalid username/password combo");
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
        console.log("here")

        // Error: if any fields are missing
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
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
         const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

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
        `, [credentials.username, hashedPassword, credentials.first_name, credentials.last_name, lowerCasedEmail])

        const user = result.rows[0];
 

        return User.makePublicUser(user);
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

