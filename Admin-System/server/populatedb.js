#! /usr/bin/env node
var async = require("async");
var mongoose = require("mongoose");

let Admin = require("./schema/admin");
let Product = require("./schema/product");
let Transaction = require("./schema/transaction");
let Order = require("./schema/order");

var userArgs = process.argv.slice(2);
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var admins = [];
var products = [];
var orders = [];
var transactions = [];

function adminCreate(username, email, password, cb) {
  let admindetail = {
    username,
    email,
    password,
  };

  let admin = new Admin(admindetail);

  admin.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New Admin: " + admin);
    admins.push(admin);
    cb(null, admin);
  });
}

function productCreate(name, type, price, description, image_path, cb) {
  let productdetail = {
    name,
    type,
    price,
  };
  if (description != false) productdetail.description = description;
  if (image_path != false) productdetail.image_path = image_path;

  let product = new Product(productdetail);

  product.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New Product: " + product);
    products.push(product);
    cb(null, product);
  });
}

function orderCreate(product_id, quantity, total_amount, cb) {
  let orderdetail = {
    product_id,
    quantity,
    total_amount,
  };

  let order = new Order(orderdetail);

  order.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New Order: " + order);
    orders.push(order);
    cb(null, order);
  });
}

function transactionCreate(customer_id, total_price, orders, cb) {
  let transactiondetail = {
    customer_id,
    total_price,
  };
  if (orders != false) transactiondetail.orders = orders;

  let transaction = new Transaction(transactiondetail);

  transaction.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New Transaction: " + transaction);
    transactions.push(transaction);
    cb(null, transaction);
  });
}

function createAdmin(cb) {
  async.parallel(
    [
      function (callback) {
        adminCreate("admin 1", "Admin.1@sample.com", "Admin1", callback);
      },
      function (callback) {
        adminCreate("Lance", "Lance.Sedutan@sample.com", "LancePogi", callback);
      },
      function (callback) {
        adminCreate(
          "Eman Putotoy",
          "Emman.Maliit@sample.com",
          "Hahah",
          callback
        );
      },
    ],
    cb
  );
}

function createProduct(cb) {
  async.parallel(
    [
      function (callback) {
        productCreate(
          "MyPhone 11",
          "Phone",
          29999.0,
          "11th generation of TechStore",
          false,
          callback
        );
      },
      function (callback) {
        productCreate(
          "MyPhone 12",
          "Phone",
          39999.0,
          "12th generation of TechStore",
          false,
          callback
        );
      },
      function (callback) {
        productCreate(
          "MyTablet",
          "Tablet",
          19999.0,
          "Techstore tablet First generation",
          false,
          callback
        );
      },
      function (callback) {
        productCreate(
          "MyTablet 2",
          "Tablet",
          29999.0,
          "Techstore tablet Second generation",
          false,
          callback
        );
      },
      function (callback) {
        productCreate(
          "MyLapTop Home",
          "Laptop",
          39999.0,
          "Professional variant of MyLaptop",
          false,
          callback
        );
      },
      function (callback) {
        productCreate(
          "MyLapTop Gaming",
          "Laptop",
          59999.0,
          "Gaming variant of MyLaptop",
          false,
          callback
        );
      },
      function (callback) {
        productCreate(
          "MyEarPhones",
          "Accessories",
          999.0,
          "Basic Earphones",
          false,
          callback
        );
      },
      function (callback) {
        productCreate(
          "MyFan",
          "Accessories",
          599.0,
          "Home Fan",
          false,
          callback
        );
      },
    ],
    cb
  );
}

function createOrder(cb) {
  async.parallel(
    [
      function (callback) {
        orderCreate(products[7], 2, 1198.0, callback);
      },
      function (callback) {
        orderCreate(products[0], 1, 29999.0, callback);
      },
      function (callback) {
        orderCreate(products[2], 1, 19999.0, callback);
      },
    ],
    cb
  );
}

function createTransaction(cb) {
  async.series(
    [
      function (callback) {
        transactionCreate(admins[0], 31197, [orders[0], orders[1]], callback);
      },
      function (callback) {
        transactionCreate(admins[1], 19999, [orders[2]], callback);
      },
    ],
    cb
  );
}

async.series(
  [createAdmin, createProduct, createOrder, createTransaction],
  function (err, results) {
    if (err) {
      console.log(`FINAL ERROR: ${err}`);
    } else {
      console.log(`PRODUCTS : ${products}`);
      console.log(`ORDERS : ${orders}`);
      console.log(`TRANSACTIONS : ${transactions}`);
    }
    mongoose.connection.close();
  }
);
