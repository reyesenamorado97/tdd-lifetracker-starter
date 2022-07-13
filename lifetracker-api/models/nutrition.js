const db = require("../db");
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
        WHERE u.id = (SELECT id FROM users WHERE email = $1)
        ORDER BY n.created_at DESC        `,
          [user.email]
        );
    
        return results.rows;
    }
  
//-----------------------------------------------------------------------------

  static async getCategoriesForUser({ user }) {

    
    const results = await db.query(
      `
      SELECT DISTINCT n.category AS "category",
      ROUND(AVG (n.calories)) AS "avgCaloriesPerCategory"
      FROM nutrition AS n
      JOIN users AS u ON u.id = n.user_id
      WHERE u.id = (SELECT id FROM users WHERE email = $1)
      GROUP BY n.category
      `,
      [user.email]
      
    );
    return results.rows
  }        

  
//-----------------------------------------------------------------------------

static async getDailyCalories({ user }) {

    
  const results = await db.query(
    `
    SELECT to_char(n.created_at, 'MM/DD/YYYY') AS "date",
    ROUND(AVG (n.calories)) AS "totalCaloriesPerDay"
    FROM nutrition AS n
    JOIN users AS u ON u.id = n.user_id
    WHERE u.id = (SELECT id FROM users WHERE email = $1)
    GROUP BY date
    `,
    [user.email]
    
  );

  return results.rows
}        
  
  
  
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
       throw new BadRequestError("No user provided!");
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
  
  
  
    static async fetchNutritionById(id){
      if(!id) {
          throw new BadRequestError("No id provided!")
      }
      const results = await db.query(
        `
          SELECT n.id,
                n.name,
                n.category,
                n.calories,
                n.image_url AS "imageUrl",
                n.user_id AS "userId",
                to_char(n.created_at, 'DD/MM/YYYY') AS "createdAt",
                n.quantity,
                u.email AS "userEmail"
                
          FROM nutrition AS n
          LEFT JOIN users AS u ON u.id = n.user_id
          WHERE n.id = $1
        `,
        [id]
      )

      const nutrition = results.rows[0]
      if (!nutrition) {
        throw new NotFoundError("Nutrition not found!")
      }
      return nutrition
  }
}

module.exports = Nutrition;