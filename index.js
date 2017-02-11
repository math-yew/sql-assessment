var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });

    app.get('/api/users/', function (req, res) {
    db.get_users([], function (err, results) {
      if(err){
        console.error(err);
        return res.send(err);
      }
      return res.send(results);
    })
    });

  app.get('/api/vehicles/', function (req, res) {
  db.get_vehicles([], function (err, results) {
    if(err){
      console.error(err);
      return res.send(err);
    }
    return res.send(results);
  })
});

  app.post('/api/users/', function (req, res) {
  db.post_user([
    req.body.firstname,
    req.body.lastname,
    req.body.email
    ], function (err, results) {
      if(err){
        console.error(err);
        return res.send(err);
      }
      return res.send(results);
    })
    });

  app.post('/api/vehicles/', function (req, res) {
  db.post_vehicles([
    req.body.make,
    req.body.model,
    req.body.year,
    req.body.ownerId
    ], function (err, results) {
      if(err){
        console.error(err);
        return res.send(err);
      }
      return res.send(results);
    })
    });

  app.get('/api/user/:userId/vehiclecount/', function (req, res) {
    db.get_vehiclecount([req.params.userId], function (err, results) {
      if (err){
        console.error(err);
        return res.send(err);
      }
      if(results.length === 0){
        return res.status(404).send("Does Not Exist");
      }
      return res.send(results[0]);
    });
  });

  app.get('/api/user/:userId/vehicle/', function (req, res) {
  db.get_user_vehicle([req.params.userId], function (err, results) {
    if(err){
      console.error(err);
      return res.send(err);
    }
    return res.send(results);
  })
  });

  app.get('/api/vehicle', function (req, res) {
  if(req.query.email){
  db.where_email([req.query.email], function (err, results) {
    if(err){
      console.error(err);
      return res.send(err);
    }
    return res.send(results);
  })
  }
  if(req.query.email){
  db.where_first([req.query.userFirstStart], function (err, results) {
    if(err){
      console.error(err);
      return res.send(err);
    }
    return res.send(results);
  })
  }
  });

  app.get('/api/newervehiclesbyyear/', function (req, res) {
  db.new_year([], function (err, results) {
    if(err){
      console.error(err);
      return res.send(err);
    }
    return res.send(results);
  })
});

app.put('/api/vehicle/:vehicleId/user/:userId', function (req, res) {
db.switch_user([req.params.vehicleId, req.params.userId], function (err, results) {
  if(err){
    console.error(err);
    return res.send(err);
  }
  return res.send(results);
})
});

app.delete('/api/user/:userId/vehicle/:vehicleId', function (req, res) {
db.delete_user([req.params.vehicleId, req.params.userId], function (err, results) {
  if(err){
    console.error(err);
    return res.send(err);
  }
  return res.send(results);
})
});

app.delete('/api/vehicle/:vehicleId', function (req, res) {
db.delete_veh([req.params.vehicleId], function (err, results) {
  if(err){
    console.error(err);
    return res.send(err);
  }
  return res.send(results);
})
});



})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
