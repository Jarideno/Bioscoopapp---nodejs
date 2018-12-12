const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('login', () => {
    it('Should succeed when invalid information is provided', (done) => {
        chai.request(server)
        .post('/api/login')
        .send({
            "username":"jdeno",
            "password":"jdeno"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    });

    it('Should throw an error when invalid information is provided', (done) => {
        chai.request(server)
        .post('/api/login')
        .send({
            "username":"test"
        })
        .end((err, res) => {
            res.should.have.status(401);

            done();
        });
    });
});

describe('register', () => {
    it('Should succeed when invalid information is provided', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
            "username":"test",
            "password":"test"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    });
});