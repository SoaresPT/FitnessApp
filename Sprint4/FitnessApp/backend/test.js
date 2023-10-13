const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); // Replace with the actual path to your server file.

chai.use(chaiHttp);
const expect = chai.expect;

// Use the test port specified in .env.test
const testPort = process.env.PORT_TEST || 3003;

// Start the server before running tests
before((done) => {
  server.listen(testPort, () => {
    console.log(`Server is running on port ${testPort}`);
    done();
  });
});


describe('User Registration API', () => {
  it('should register a new user', (done) => {
    chai
      .request(server)
      .post('/api/signup')
      .send({ email: 'test01235@metropolia.fi', password: 'Password0123456!!!' })
      .timeout(5000)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('User registered successfully');
        done();
      });
  });
});

describe('Get All Registered Users API', () => {
  it('should retrieve a list of all registered users', (done) => {
    chai
      .request(server)
      .get('/api//users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Check if res.body is an array of user objects.
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('Delete User by Email API', () => {
  it('should delete a user by email', (done) => {
    const userEmail = 'test01235@metropolia.fi'; // Replace with an existing user's email.
    chai
      .request(server)
      .delete(`/api/users/${userEmail}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User deleted successfully');
        done();
      });
  });
});

describe('Update User by Email API', () => {
  it('should update a user by email', (done) => {
    const userEmail = 'test01235@metropolia.fi'; // Replace with an existing user's email.
    chai
      .request(server)
      .put(`/api/users/${userEmail}`)
      .send({ /* Updated user data */ })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User updated successfully');
        done();
      });
  });
});