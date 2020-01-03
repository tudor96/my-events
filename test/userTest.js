process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('USER TEST REQUESTS', () => {

  //   describe('/GET all events', () => {
  //     it('it should GET all events', (done) => {
  //       chai.request(server)
  //         .get('/api/candidate/')
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('array');
  //           done();
  //         });
  //     });
  //     it('it should GET candidate given id', (done) => {
  //       chai.request(server)
  //         .get('/api/candidate/' + 1)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.companies.should.be.a('array');
  //           res.body.should.have.property('firstName');
  //             res.body.should.have.property('lastName');
  //             done();
  //         });
  //     });
  //   });


  describe('/POST Register new user', () => {
    it('it should register new user', (done) => {
      let user = {
        "firstName": "Jonny",
        "lastName": "SilverHand",
        "email": "jonnt12@email.com",
        "password": "jonny"
      }
      chai.request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should fail registering new user ', (done) => {
      let user = {
        "firstName": undefined,
        "lastName": "",
      }
      chai.request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    
  });

  describe('/POST Login created user', () => {
    it('log in new user', (done) => {
      let user = {
        "email": "jonnt@email.com",
        "password": "jonny"
      }
      chai.request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should fail login new user ', (done) => {
      let user = {
        "email": "undefined",
        "password": "",
      }
      chai.request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  //   describe('/PUT/:id candidate', () => {
  //     it('it should UPDATE a candidate given the id', (done) => {
  //       chai.request(server)
  //         .put('/api/candidate/' + 1)
  //         .send({
  //           "firstName": "Jony1",
  //           "lastName": "Last name updated!",
  //           "companies": ["grd", "Veoneer"],
  //           "technologies": ["NodeJsssss", "JavaScript"]
  //         })
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('lastName').eql("Last name updated!");

  //           done();
  //         });
  //     });
  //     it('it should UPDATE a candidate given the id with new companies', (done) => {
  //       chai.request(server)
  //         .put('/api/candidate/' + 1)
  //         .send({
  //           "firstName": "Jony1",
  //           "lastName": "Last name updated!",
  //           "companies": ["new_company", "new_company"],
  //           "technologies": ["NodeJsssss", "JavaScript"]
  //         })
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('lastName').eql("Last name updated!");

  //           done();
  //         });
  //     });
  //     it('it should FAIL UPDATE a candidate given the id', (done) => {
  //       chai.request(server)
  //         .put('/api/candidate/' + 1)
  //         .send({
  //           "firstName": undefined,
  //         })
  //         .end((err, res) => {
  //           res.should.have.status(400);
  //           done();
  //         });
  //     });
  //   });

});