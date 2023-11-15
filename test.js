const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server.js'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Order Processing Service', () => {
  it('should create a new order', (done) => {
    chai
      .request(app)
      .post('/orders')
      .send({ userId: 1, productId: 101, quantity: 2 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('userId');
        expect(res.body).to.have.property('productId');
        expect(res.body).to.have.property('quantity');
        done();
      });
  });

  it('should get all orders', (done) => {
    chai
      .request(app)
      .get('/orders')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
