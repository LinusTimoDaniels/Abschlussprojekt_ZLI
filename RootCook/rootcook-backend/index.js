const express = require('express');
const pool = require('./database');
const app = express();
const PORT = 8080;
const IP_ADDRESS = '127.0.0.1';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const Cookies = require("js-cookie");
const verifyJWT = require('./verifyJWT');
const cookieParser = require('cookie-parser');
const refreshTokenController = require('./refreshTokenController');
const logoutController = require('./logoutController');
const cors = require('cors');

app.use(cors());

//Middleware for cookies
app.use(cookieParser());

// Parse JSON request bodies
app.use(express.json());


// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Include 'Authorization' header
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



app.get('/refresh', refreshTokenController.handleRefreshToken);
app.get('/logout', logoutController.handleLogout);



app.get('/recipe', (req, res) => {
  const UserId = req.query.user;
  const Query = UserId
  ? "SELECT recipe.*, meal_type.type FROM recipe JOIN meal_type ON recipe.meal_type_id = meal_type.id WHERE recipe.User_id = ?"
  : "SELECT recipe.*, meal_type.type FROM recipe JOIN meal_type ON recipe.meal_type_id = meal_type.id WHERE published = 0";

  pool.query(Query, [UserId], (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});


app.post('/recipe', verifyJWT, async (req, res) => {
  const { title, description, image, instructions, calories, protein, fibres, fat, sugar, published, categorie, mealtype, userId } = req.body.recipeData;

  const filterIngredients = req.body.filterIngredients;

  console.log("Recipe", title, description, image, instructions, calories, protein, fibres, fat, sugar, published, categorie, mealtype, userId);

  if (
    !title ||
    !description ||
    !image ||
    !instructions ||
    !calories ||
    !protein ||
    !fibres ||
    !fat ||
    !sugar ||
    !categorie ||
    !mealtype ||
    !userId
  ) {
    return res.status(400).json({ error: "Data incomplete" });
  }

  pool.query(`INSERT INTO recipe (title, description, image, instructions, calories, protein, fibres, fat, sugar, published, Categorie_id, meal_type_id, User_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [title, description, image, instructions, calories, protein, fibres, fat, sugar, published, categorie, mealtype, userId], (error, results) => {
    if (error) {
      console.error('error creating recipe', error);
      res.status(500).json({ error: 'Internal server error, error creating recipe' });
    } else {
      // Process the filterIngredients array and perform necessary database operations
      filterIngredients.forEach((ingredient) => {
        console.log("Ingredient1:", ingredient.id, ingredient.name, ingredient.amount);
        // Perform any other operations related to the ingredient, such as inserting into the database
      });

      const IngredientsToCreate = filterIngredients.filter((ingredient) => !ingredient.id);

      console.log(IngredientsToCreate);

      IngredientsToCreate.forEach(ingredient => {
        pool.query(`INSERT INTO ingredient (name) VALUES (?)`, [ingredient.name], async (error, ingResults) => {
        if (error) {
        console.error('error creating ingredient', error);
        res.status(500).json({ error: 'Internal server error, error creating ingredient' });
        }else{
          return ingResults;
        }
        })
      });

        const getRecipeId = (instructions) => {
          return new Promise((resolve, reject) => {
            pool.query(`SELECT id FROM recipe WHERE instructions = ?`, [instructions], (error, results) => {
              if (error) {
                console.error('error getting recipeid', error);
                reject('Internal server error, error getting recipeid');
              } else {
                console.log("recipe iddddd:", results);
                resolve(results);
              }
            });
          });
        };

        // Usage
        recipeID = getRecipeId(instructions)
          .then((recipeIdResults) => {
            // Further processing with the recipe ID here
            // You can access the result using recipeIdResults[0].id if it's an array
            // or recipeIdResults.id if it's a single row
            // ...
            console.log("recipeIdResults[0].id", recipeIdResults[0].id);
            return recipeIdResults[0].id
          })
          .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error });
          });

          //RecipeID

          const getIngredientIdFromDatabase = (ingredient) => {
            return new Promise((resolve, reject) => {
              pool.query(
                `SELECT id, name FROM ingredient WHERE name = ?`,
                [ingredient.name],
                (error, results) => {
                  if (error) {
                    console.error('Error getting ingredient ID:', error);
                    reject('Internal server error, unable to retrieve ingredient ID');
                  } else {
                    resolve(results);
                  }
                }
              );
            });
          };

          const getIngredientIds = async (filterIngredients) => {
            const ingredientIds = [];
            for (const ingredient of filterIngredients) {
              try {
                const results = await getIngredientIdFromDatabase(ingredient);
                ingredientIds.push(results);
              } catch (error) {
                console.error('Error:', error);
                throw error;
              }
            }
            return ingredientIds;
          };

          const ingredientIdsPromise = getIngredientIds(filterIngredients);

          const combinedIngredients = [];

          // Use Promise.all() to wait for both promises to resolve
          Promise.all([ingredientIdsPromise, filterIngredients])
            .then(([ingredientIds, filterIngredients]) => {
              // Iterate over the ingredientIds array
              for (const ingredientId of ingredientIds) {
                const id = ingredientId[0].id;
                const name = ingredientId[0].name;

                // Find the matching ingredient in the filterIngredients array
                const matchedIngredient = filterIngredients.find(
                  (filterIngredient) => filterIngredient.name === name
                );

                // If a match is found, combine the properties and add it to the combinedIngredients array
                if (matchedIngredient) {
                  const ingredientName = matchedIngredient.name;
                  const amount = matchedIngredient.amount;
                  combinedIngredients.push({ id: id, name: ingredientName, amount: amount });
                  console.log( "id:", id, "name:", ingredientName, "amount:", amount );
                }
              }

              // Use the combinedIngredients array as needed
              // ...
              console.log("combinedIngredients", combinedIngredients);
              recipeID
                .then((resolvedRecipeID) => {
                  combinedIngredients.forEach((combinedIngredient) => {
                    console.log("recipeID", resolvedRecipeID, "combinedIngredient.id", combinedIngredient.id, "combinedIngredient.amount", combinedIngredient.amount);
                    pool.query(`INSERT INTO recipe_has_ingredient (Recipe_id, Ingredient_id, amount) VALUES (?, ?, ?)`, [resolvedRecipeID, combinedIngredient.id, combinedIngredient.amount], (error, result) => {
                      if (error) {
                        console.error('error creating recipe_has_ingredient', error);
                        /* res.status(500).json({ error: 'Internal server error, error creating recipe_has_ingredient' }); */
                      } else {
                        /* res.status(200).json({ success: 'You have successfully added a Recipe and its dependencies' }); */
                        return result;
                      }
                    });
                  });
                })
                .catch((error) => {
                  console.error("Error:", error);
                  return res.status(500).json({ error }); // Add 'return' statement here
                });
            })
            .catch((error) => {
              console.error("Error:", error);
              res.status(500).json({ error });
            });
      res.json(results);
    }
  });
});
 



app.put('/recipe', verifyJWT, () => {

});


app.delete('/recipe', verifyJWT, (req, res) => {
  const recipeId = req.query.recipe;
    pool.query(`DELETE FROM recipe WHERE recipe.id = ?`, [recipeId], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});


app.post('/login', (req, res) => {
  const { username, email, password } = req.body;
  pool.query(
    'SELECT * FROM user WHERE email = ? AND username = ?',
    [email, username],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
          const user = results[0];
          bcrypt.compare(password, user.password, (bcryptError, bcryptResult) => {
            if (bcryptError) {
              console.error('Error comparing passwords:', bcryptError);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              if (bcryptResult) {
                const userData = {
                  id: user.id,
                  username: user.username,
                  email: user.email
                };
                const accessToken = jwt.sign(
                  {"username" : username},
                  process.env.ACCESS_TOKEN_SECRET,
                  {expiresIn: '300s'}
                );
                const refreshToken = jwt.sign(
                  {"username" : username},
                  process.env.REFRESH_TOKEN_SECRET,
                  {expiresIn: '1d'}
                );

                pool.query(
                  `UPDATE user SET ACCESS_TOKEN = ?, REFRESH_TOKEN = ? WHERE username = ? AND password = ?`,
                  [accessToken, refreshToken, user.username, user.password],
                  (updateError, updateResult) => {
                    if (updateError) {
                      console.error('Error updating tokens:', updateError.message);
                      return res.sendStatus(500);
                    }
                    console.log('Tokens updated in the database:', updateResult);
                    console.log(accessToken, refreshToken);
                    // Cookies.set('jwt', refreshToken)

                    // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
                    // console.log(res.cookie);
                    // console.log("Cookies", Cookies.get());
                    res.status(200).json({ data: userData, accessToken, refreshToken });
                  }
                );
              } else {
                res.status(400).json({ error: "Invalid password" });
              }
            }
          });
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      }
    }
  );
});





app.post('/register', (req, res) => {
  const { username, email, password, password1 } = req.body;

  if (password !== password1) {
    res.status(400).json({ error: 'Passworts dont match!' });
  }

  // Check if the user already exists
  pool.query(
    `SELECT * FROM user WHERE username = ? OR email = ?`,
    [username, email],
    (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (result.length > 0) {
          // User already exists
          res.status(400).json({ error: 'User already exists' });
        } else {
          // User does not exist, proceed with registration
          bcrypt.hash(password, 10).then((hash) => {
            pool.query(
              `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`,
              [username, email, hash],
              (error, result) => {
                if (error) {
                  console.error('Error executing query', error);
                  res.status(500).json({ error: 'Internal server error' });
                } else {
                  console.log('User registered:', result);
                  res.json("USER REGISTERED");
                }
              }
            );
          });
        }
      }
    }
  );
});


app.get('/user', verifyJWT, (req, res) => {
  const cookie = req.query.jwt;
  console.log(cookie);
  if (!cookie) return res.sendStatus(401);
  pool.query(`SELECT id, username FROM user WHERE REFRESH_TOKEN = ?`, [cookie], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});

app.get('/bookmarks', verifyJWT, (req, res) => {
  const UserId = req.query.user;
  console.log(UserId);
    pool.query(`SELECT r.*, meal_type.type FROM Recipe AS r JOIN Bookmarks AS b ON r.id = b.Recipe_id JOIN meal_type ON r.meal_type_id = meal_type.id WHERE b.User_id = ?`, [UserId], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.post('/bookmarks', verifyJWT, (req, res) => {
  const UserId = req.body.user;
  const RecipeId = req.body.recipe;
    pool.query(`INSERT INTO bookmarks (Recipe_id, User_id) VALUES ( ?, ?)`, [RecipeId, UserId], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});


app.delete('/bookmarks', verifyJWT, (req, res) => {
  const UserId = req.body.user;
  const RecipeId = req.body.recipe;
    pool.query(`DELETE FROM bookmarks WHERE Recipe_id = ? AND User_id = ?`, [RecipeId, UserId], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});

app.get('/ingredients', verifyJWT, (req, res) => {
  const RecipeId = req.query.recipe;
    pool.query(`SELECT i.id, i.name, rhi.amount FROM Recipe r JOIN Recipe_has_Ingredient rhi ON r.id = rhi.Recipe_id JOIN Ingredient i ON rhi.Ingredient_id = i.id WHERE r.id = ?`, [RecipeId], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});


app.get('/ingredients/all', verifyJWT, (req, res) => {
    pool.query(`SELECT * FROM Ingredient`, (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});


app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running on ${IP_ADDRESS}:${PORT}`);
});
