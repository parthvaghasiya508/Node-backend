var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return all users

  it("should return all users",function(done){

    // calling all users api
    server
    .get("/users")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.success.should.equal(true);
      done();
    });
  });

  // #2 should add new user

  it("should add new user",function(done){

    // calling add new user api
    server
    .post("/users")
    .send({name:"Tester", phoneNumber:"567575765"})
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.success.should.equal(true);
      done();
    });
  });


  // #3 should update user

  it("should update user",function(done){

    // calling update user api
    server
    .patch("/users?name=Tester")
    .send({name:"Updated Tester"})
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.success.should.equal(true);
      done();
    });
  });


  // #4 should delete user

  it("should delete user",function(done){

    // calling delete user api
    server
    .delete("/users?id=9")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.success.should.equal(true);
      done();
    });
  });

});