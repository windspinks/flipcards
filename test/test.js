const request = require('supertest');
const assert = require('assert');
const app = require('../app');
const Users = require('../models/users');

describe ("Users ", function() {
  after("Remove All", function (done) {
    Users.remove({}).then(function () {done();});
  });

  it("should be able to register", function(done) {
    request(app).post("/signup")
    .send({
      username: "testUser1",
      password: "password"
    })
    .expect(201)
    .expect(function (res) {
      assert.equal(res.text, "Created. Redirecting to /signin");
    })
    .end(done);
  });
  it("should not be able to register if missing info", function (done) {
    request(app).post("/signup").send({}).expect(400)
    .expect(function (res) {
      assert.equal(res.text, "Bad Request. Redirecting to /signup");
    }).end(done);
  });

  it("should be able to login", function(done) {
    request(app).post("/signin")
    .send({
      username:"testUser1",
      password:"password"
    }).expect(302)
    .expect(function (res) {
      assert.equal(res.text, "Found. Redirecting to /");
    }).end(done);
  });
  it("should not be able to login with invalid information", function(done) {
    request(app).post("/signin")
    .send({
      username:"I do not exists",
      password:"non existant"
    }).expect(401)
    .expect(function (res) {
      assert.equal(res.text, "Unauthorized. Redirecting to /signin");
    }).end(done);
  });


  it("should be able to logout", function(done) {
    request(app).post("/logout").expect(200)
    .expect(function (res) {
      assert.equal(res.headers.location, "/signin");
    }).end(done);
  });

  // Allow the user to create multiple decks of flipcards
  // Allow the user to create flipcards within a deck
  // Allow the user to edit a flipcard
  // Allow the user to delete a flipcard
  // Allow the user to start a quiz using a flipcard deck, Ideally, this quiz would show the cards randomly
  // When a flipcard is flipped, allow the user to choose whether they answered successfully or unsuccessfully, and record that answer
});





/*
  /user
  /deck (post-create)
  /flipcard (post-create, put-edit, post-delete)
  /game
*/
