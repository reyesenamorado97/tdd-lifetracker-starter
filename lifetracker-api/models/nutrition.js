const db = require("../../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Nutrition {
  
    static async listNutritionForUser({ user }) {
        const results = await db.query(
          `
        SELECT  n.id AS "nutritionId",
                n.name AS "name",
                n.category AS "category",
                n.quantity AS "quantity",
                n.calories AS "calories",
                n.image_url AS "imageUrl",
                n.created_at
        FROM nutrition AS n
        JOIN users AS u ON u.id = n.user_id
        WHERE u.id = (SELECT id FROM users WHERE email = $1);
        `,
          [user.email]
        );
    
        return results.rows;
      }

//-----------------------------------------------------------------------------

    static async createNutrition({ nutrition, user }) {
      
        const requiredFields = [
            "name",
            "category",
            "quantity",
            "calories",
            "image_url"
        ];

        // Error: if any fields are missing
        requiredFields.forEach(field => {
            if (!nutrition.hasOwnProperty(field)) {
                throw new BadRequestError(`Form requires ${field} in request body`);
            }
        })

     if (!user) {
       throw new BadRequestError("No user provided");
     }
      
    const results = await db.query(
    `
        INSERT INTO nutrition (name, category, quantity, calories, image_url, user_id)
        VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
        RETURNING id, name, category, quantity, calories, image_url, user_id, created_at
    `,
      [ nutrition.name,
        nutrition.category,
        nutrition.quantity,
        nutrition.calories,
        nutrition.image_url,
        user.email],

    );
    return results.rows[0];
  }
}

module.exports = Nutrition;