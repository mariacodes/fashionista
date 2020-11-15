//ng serve --proxy-config proxy.config.json

// Use Express
require('dotenv').config();
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");

// Use MongoDB
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The products collection
var PRODUCTS_COLLECTION = "products";
var PRODUCTS_ADMIN = "admin";
var PRODUCTS_USER = "user";
var USER_SHOPPINGCART = "shoppingcart";
var USER_WISHLIST = "wishlist";
const USER_TYPES = ['admin', 'user'];


// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Local database URI.


// Init the server
mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = client.db();
        console.log("Database connection done.");

        // Initialize the app.
        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

/*  "/api/products"
 *  GET: finds all products
 */
app.get("/api/products", function (req, res) {
    database.collection(PRODUCTS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/products"
 *   POST: creates a new product
 */
app.post("/api/products", function (req, res) {
    var product = req.body;

    if (!product.name) {
        manageError(res, "Invalid product input", "Name is mandatory.", 400);
    } else if (!product.brand) {
        manageError(res, "Invalid product input", "Brand is mandatory.", 400);
    } else if (!product.price) {
        manageError(res, "Invalid product input", "Price is mandatory.", 400);
    }else if (!product.email) {
        manageError(res, "Invalid product input", "Email is mandatory.", 400);
    }else if (!product.avaibility) {
        manageError(res, "Invalid product input", "Avaibility is mandatory.", 400);
    }
        else if (!product.fashionimage) {
            manageError(res, "Invalid product input", "Image is mandatory.", 400);
    }else {
        database.collection(PRODUCTS_COLLECTION).insertOne(product, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});


/*  "/api/products/:id"
 *   DELETE: deletes product by id
 */
app.delete("/api/products/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}

app.post('/api/admins',(req,res)=>{
    var admin=req.body;
    database.collection(PRODUCTS_ADMIN).insertOne(admin, function (err, doc) {
        if (err) {
            manageError(res, err.message, "Failed to create new product.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

app.get('/api/admins',(req,res)=>{
    database.collection(PRODUCTS_ADMIN).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

app.post('/api/users',(req,res)=>{
    var user=req.body;
    database.collection(PRODUCTS_USER).insertOne(user, function (err, doc) {
        if (err) {
            manageError(res, err.message, "Failed to create new user.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});
app.get('/api/users',(req,res)=>{
    database.collection(PRODUCTS_USER).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

app.post('/api/users/:user/shoppingcart/add', (req, res) => {
    var user = req.params.user;
    var item = req.body;
    delete item._id;
    
    var productWithUser = {
        userId: user,
        ...item
    }

    database.collection(USER_SHOPPINGCART).insertOne(productWithUser, (err, doc) => {
        if (err) {
            manageError(res, err.message, "Failed to add to shoppingcart");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

// attempt to get shopping cart
app.get('/api/users/:user/shoppingcart/get',(req,res)=>{
    var user = req.params.user;
    var query = {
        userId: user
    };

    database.collection(USER_SHOPPINGCART).find(query).toArray(function (error, data){
        if(error){
            manageError(res,err.message, "Failed to retrieve user's shoppingcart");
        }
        else {
            var productWithoutUser = data.map((product) => {
                delete product.userId;
                return product;
            });

            res.status(200).json(productWithoutUser);
        }
    });
});

app.delete("/api/users/:user/shoppingcart/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(USER_SHOPPINGCART).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product from shoppingcart.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

app.delete("/api/users/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid user id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(PRODUCTS_USER).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete user.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});


//Wish list get and post

app.post('/api/users/:user/wishlist/add', (req, res) => {
    var user = req.params.user;
    var item = req.body;
    delete item._id;

    var productWithUser = {
        userId: user,
        ...item
    }

    database.collection(USER_WISHLIST).insertOne(productWithUser, (err, doc) => {
        if (err) {
            manageError(res, err.message, "Failed to add to wishlist");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});


app.post('/api/authenticate', (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;
    var userType = req.body.userType;

    if (!USER_TYPES.includes(userType)) {
        manageError(res, "Invalid User Type", "Invalid User Type");
    }

    var collection;
    var query;

    if (userType === PRODUCTS_ADMIN) {
        collection = PRODUCTS_ADMIN;
        query = {
            type: userName
        };
    } else {
        collection = PRODUCTS_USER;
        query = {
            email: userName
        };
    }

    database.collection(collection).findOne(query)
        .then((user) => {
            if (!user) {
                res.status(500).json({
                    message: 'user not found'
                });
            }
            if (user.pass === password) {
                res.status(200).json(user);
            } else {
                res.status(500).json({
                    message: 'invalid pw'
                });
            }
        })
        .catch((dbErr) => {
            res.status(500).json(dbErr);
        });
});

// attempt to get shopping cart
app.get('/api/users/:user/wishlist/get',(req,res)=>{
    var user = req.params.user;
    var query = {
        userId: user
    };

    database.collection(USER_WISHLIST).find(query).toArray(function (error, data){
        if(error){
            manageError(res,err.message, "Failed to retrieve user's wishlist");
        }
        else {
            var productWithoutUser = data.map((product) => {
                delete product.userId;
                return product;
            });

            res.status(200).json(productWithoutUser);
        }
    });
});

app.delete("/api/users/:user/wishlist/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(USER_WISHLIST).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product from wishlist.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});
