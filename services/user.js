// /**
//  * A service layer that makes all of our User database queries.
//  *
//  * @module services/user
//  *
//  * @function findUserById finds a User by their unique Mongo id
//  * @function findUserByGoogleId finds a User by their Google id
//  * @function create a User that will be authenticated by Google
//  */
// var User = require('../models/user');
//
// var UserService = {
//   findUserById: function (id, callback) {
//     User.findById(id, function (err, user) {
//       if (err) {
//         return callback(err, null);
//       }
//
//       return callback(null, user);
//     });
//   },
//
//   findUserByGoogleId: function (id, callback) {
//     User.findOne({ googleId: id }, function (err, user) {
//
//       if (err) {
//         return callback(err, null);
//       }
//
//       return callback(null, user);
//     });
//   },
//
//   createGoogleUser: function (id, token, name, email, callback) {
//     var user = new User();
//
//     user.googleId = id;
//     user.googleToken = token;
//     user.googleName = name;
//     user.googleEmail = email;
//
//     user.save(function (err) {
//       if (err) {
//         return callback(err, null);
//       }
//
//       return callback(null, user);
//     });
//   },
// };
//
// module.exports = UserService;
/**
 * A service layer that makes all of our User database queries.
 *
 * @module services/user
 *
 * @function findUserById finds a User by their unique Mongo id
 * @function findUserByGoogleId finds a User by their Google id
 * @function create a User that will be authenticated by Google
 */
var User = require('../models/user');
var pool = require('../modules/pool');

var UserService = {
  findUserById: function (id, callback) {
    console.log('this is the id', id);
    // User.findById(id, function (err, user) {
    pool.connect(function(err,connection,done){
      console.log('in findById pool connect');
      if(err){
        console.log(err);
        return callback(err, null);

      } else{
        connection.query("SELECT * FROM users WHERE id=$1",[id],function(err,user){
          done();
          if(err){
            console.log(err);
            return callback(err, null);
          }
          else{
            console.log('there were no errors!!');
            return callback(null, user.rows[0]);
          }
        });
      }
    });

      // if (err) {
      //   return callback(err, null);
      // }
      //
      // return callback(null, user);
    // });
  },

  findUserByGoogleId: function (id, callback) {
    pool.connect(function(err,connection,done){
      if(err){
        console.log('there was an error in finding the person',err);
        return callback(err, null);
      }
      else{
        console.log('in findUserByGoogleId pool connect with no errors');
        connection.query("SELECT * FROM users WHERE google_id=$1",[id],function(error,user){
          done();
          if(error){
            console.log(error);
            return callback(error, null);
          }
          else{
            console.log('this is the user found by google id', user.rows[0]);
            return callback(null, user.rows[0]);
          }
        });
      }
    });

    // User.findOne({ googleId: id }, function (err, user) {
    //
    //   if (err) {
    //     return callback(err, null);
    //   }
    //
    //   return callback(null, user);
    // });
  },

  createGoogleUser: function (id, token, name, email, callback) {
    // var user = new User();
    // console.log('this is what the user looks like at first',user);
    // user.googleId = id;
    // console.log('this is the user with just the googleId',user);
    // user.googleToken = token;
    // console.log('this is what the user looks like with the googleToken',user);
    // user.googleName = name;
    // console.log('the user has a name now',user);
    // user.googleEmail = email;
    // console.log('this is the final user',user);
    // user.status = true;

    pool.connect(function(err,connection,done){
      console.log('in first pool.connect');
      connection.query("INSERT INTO users (name,email,google_id,token,status) VALUES ($1,$2,$3,$4,$5)",[name,email,id,token,true],function(err,response){
        done();
        console.log('in first query');
        if(err){
          console.log(err);
          return callback(err, null);
        }
        else{
          connection.query("SELECT * FROM users WHERE google_id=$1",[id],function(err,users){
            console.log('In second query');
            done();
            if(err){
              console.log(err);
              return callback(err, null);

            }
            else{
              console.log(users);
              return callback(null, users.rows[0]);
            }
          });
        }
      });
    });

    // user.save(function (err) {
    //   if (err) {
    //     return callback(err, null);
    //   }
    //
    //   return callback(null, user);
    // });
  },
};

module.exports = UserService;
