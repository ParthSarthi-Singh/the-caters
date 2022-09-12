const express = require('express')
const fs = require('fs')
const path = require('path')
var session = require('express-session')
const multer = require('multer')
const bcrypt = require("bcrypt");
const cors = require('cors')
const app = express()
const port = 3002;

// database
const db = require("./database");
db.init();


//config express-seesion

app.use(session({
  secret: 'mohammed',
  resave: false,
  saveUninitialized: true,

}))


//jwt

const jwt = require('jsonwebtoken');
const JWT_SECRET = "Thisi$Huzef@"

//config cors

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET , POST , PUT , PATCH , DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With , Accept , Origin, authorization');
  res.setHeader('Access-Control-Expose-Headers', 'authorization');
  next();

});



const userInstance = require("./database/models/user.js")
const userModel = userInstance.model;
const userType = userInstance.userRoleEnums;
const vendorModel = require("./database/models/vendor.js").model
const foodDishesModel = require("./database/models/foodDishes.js").model
//middle-wares

app.use(express.urlencoded());
app.use(express.json())
app.use(express.static("uploads"))
app.use(express.static("public"))


// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

app.post('/signup', (req, res) => {
  const reqUser = req.body
  const name = reqUser.firstName + reqUser.lastName
  const emailId = reqUser.emailId;

  userModel.findOne({ emailId })
    .then((regUser) => {
      if (regUser !== null) {

        res.status(406).send({ msg: ` User ${regUser.name} already registered` });
      }
      else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            res.status(403).send({ msg: "something went wrong in salt generation" });
          }
          else {
            bcrypt.hash(reqUser.password, salt, (err, hash) => {
              if (err) {
                res.status(403).send({ msg: "something went wrong in hashing" + err });
              }
              else {
                userModel
                  .create({
                    name: name,
                    emailId: reqUser.emailId,
                    password: hash,
                    userType: userType.customer
                  })
                  .then((user) => {
                    res.status(200).send({ msg: `${user.name} registered successfully` });
                  })
                  .catch((err) => {
                    res.status(405).send({ msg: `User not registered` });
                  });
              }
            });
          }
        });
      }
    })

})

app.post('/login', (req, res) => {
  const requser = req.body
  const emailId = requser.emailId
  const password = requser.password


  userModel.findOne({ emailId })
    .then((user) => {

      if (user === null || user.emailId === null || user.password === null) {
        res.status(401).json({ auth: false, msg: "no user found" })
      }
      else {
        bcrypt.compare(password, user.password, (err, status) => {
          if (err) {
            res.status(403).send({ err: "something wrong in compare" })
          }
          else {
            if (status === true) {

              // const data = {user:{id: user._id,emailId : user.emailId}}
              const user_id = user._id
              req.session.userCreds = user
              req.session.isLoggedIn = true
              const jwtToken = jwt.sign({ user }, JWT_SECRET);
              res.status(200).json({ auth: true, token: jwtToken, msg: "User Login successfully", userCreds: user })

            }
            else {
              res.status(401).json({ auth: false, msg: "incorrect password" })

            }
          }
        })
      }
    })
    .catch((err) => {
      res.status(503).send({ err: "Internal Server Error" })
    })
})


const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if (!token) {
    res.status(401).json({ auth: false, msg: "user authentication failed, no token found" })
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ auth: false, msg: "user authentication failed" })
      } else {
        req.user = decoded.user
        next()
      }
    })
  }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
  res.status(200).json({ auth: true, msg: "authentication successfull", userCreds: req.user })
})


app.get("/logout", function (req, res) {
  req.session.isLoggedIn = false;
  req.session.isVendorLoggedIn = true
  req.session.destroy();
  res.status(200).json({ logout: true, msg: "logout success" });
})

app.post("/logout", function (req, res) {
  req.session.isLoggedIn = false;
  req.session.destroy();
  res.status(200).json({ logout: true, msg: "logout success" });
})


app.get('/vendorSignup', (req, res) => {

  const shopName = req.body.shopName

  vendorModel.findOne({ shopName: shopName })
    .then((vendor) => {
      if (vendor !== null) {

        res.status(407).send({ err: `Vendor ShopName ${vendor.shopName} already registered please try with New ${vendor.shopName}` });
      }
      else {
        res.status(200).send({ msg: `${shopName} available` });
      }
    })
})

app.post('/vendorSignup', (req, res) => {
  const reqUser = req.body
  const name = reqUser.name
  const emailId = reqUser.emailId;
  const password = reqUser.password;
  const shopName = reqUser.shopName
  const shopAddress = reqUser.shopAddress


  vendorModel.findOne({ emailId: emailId })
    .then((regUser) => {
      if (regUser !== null) {

        res.status(406).json({ vendorStatus: true, msg: `Vendor with this emailId already registered, please login` });
      }
      else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            res.status(403).json({ vendorStatus: false, msg: "something went wrong in salt generation" });
          }
          else {
            bcrypt.hash(reqUser.password, salt, (err, hash) => {
              if (err) {
                res.status(403).json({ vendorStatus: false, msg: "something went wrong in hashing(bcrypt error)" });
              }
              else {
                vendorModel
                  .create({
                    ownerName: name,
                    emailId: emailId,
                    password: hash,
                    shopName: shopName,
                    shopAddress: shopAddress,
                    userType: userType.vendor
                  })
                  .then((user) => {
                    res.status(200).json({ vendorStatus: true, msg: `${user.shopName}, vendor  registered successfully` });
                  })
                  .catch((err) => {
                    // console.log(err)
                    res.status(406).json({ vendorStatus: false, msg: `Vendor not registered` });
                  });
              }
            });
          }
        });
      }

    })

})



app.post('/vendorLogin', (req, res) => {
  const requser = req.body
  const emailId = requser.emailId
  const password = requser.password


  vendorModel.findOne(
    {
      emailId: emailId,
      userType: userType.vendor
    })
    .then((user) => {

      if (user === null || user.emailId === null || user.password === null || user.userType === null) {
        res.status(403).json({ vendorAuth: false, msg: "Vendor not found" })
      }
      else {
        bcrypt.compare(password, user.password, (err, status) => {
          if (err) {
            res.status(403).json({ vendorAuth: false, msg: "something wrong in compare(bcrypt error)" })
          }
          else {
            if (status === true && user.userType === userType.vendor) {
              const vendor = user._id
              req.session.vendorCreds = user
              req.session.isVendorLoggedIn = true
              const jwtToken = jwt.sign({ user }, JWT_SECRET);
              res.status(200).json({ vendorAuth: true, token: jwtToken, msg: "Vendor Login successfully", vendorCreds: user })

            }
            else {
              res.status(401).json({ vendorAuth: false, msg: "incorrect password" })

            }
          }
        })
      }
    })
    .catch((err) => {
      res.status(503).json({ vendorAuth: false, msg: "Internal Server Error" })
    })
})

const verifyVendorJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if (!token) {
    res.status(401).json({ vendorAuth: false, msg: "Vendor authentication failed, no token found" })
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        req.session.isVendorLoggedIn = false
        res.status(401).json({ vendorAuth: false, msg: "vendor authentication failed" })
      } else {
        req.vendor = decoded.user
        req.session.vendorCreds = req.vendor
        //console.log(req.session.vendorCreds)
        req.session.isVendorLoggedIn = true
        next()
      }
    })
  }
}


app.post('/vendor/addFoodDishes', [upload.single("imageUrl"), verifyVendorJWT], (req, res) => {
  const reqVendor = req.session.vendorCreds
  //console.log("req vendor",reqVendor)
  const reqItem = req.body

  const itemName = reqItem.itemName
  const itemPrice = reqItem.itemPrice
  const shopName = reqVendor.shopName
  const vendorId = reqVendor._id
  const emailId = reqVendor.emailId;
  const imageUrl = req.file
  const itemDescription = reqItem.itemDescription

  if(itemName === undefined || itemPrice === undefined || imageUrl === undefined || imageUrl.filename === undefined || itemDescription === undefined){
    res.status(401).json({dishStatus : false, msg : "Please Enter Proper Details"})
    return;
  }

 // console.log("path to image :",imageUrl.filename)
  
  foodDishesModel.create({
    itemName: itemName,
    itemPrice: itemPrice,
    imageUrl: imageUrl.filename,
    itemDescription: itemDescription,
    shopName: shopName,
    vendorId: vendorId
  })
    .then((foodDish) => {
      res.status(200).json({ dishStatus: true, dishData: foodDish, msg: "Food Dish added successfully" })
    })
    .catch((err) => {
      console.log(err)
      res.status(401).json({ dishStatus: false, msg: "Error in adding food dish, catch" })

    })

})


app.get('/isVendorAuth', verifyVendorJWT, (req, res) => {
  res.status(200).json({ vendorAuth: true, msg: "authentication successfull", vendorCreds: req.vendor })
})

app.get('/fetchProducts', (req,res)=>{
  foodDishesModel.find({}).then((products)=>{
    //console.log(products)
    res.status(200).json({fetchedProducts : products, productStatus : true})
  }).catch((err)=>{
    console.log(err)
    res.status(401).json({fetchedProducts : products, productStatus : false})
  })
})


function fetchProducts(callback) {
  foodDishesModel.find({}, function (error, products) {
    callback(error, products)
  })
}

app.route('/addToCart')

app.get('/vendorFetchProducts', (req,res)=>{
  const vendorId = req.body.vendorId;
  foodDishesModel.find({vendorId : vendorId}).then((products)=>{
    //console.log(products)
    res.status(200).json({fetchedProducts : products, productStatus : true})
  }).catch((err)=>{
    console.log(err)
    res.status(401).json({ productStatus : false})
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


