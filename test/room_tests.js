const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
let idToDelete;

chai.should();
chai.use(chaiHttp);


describe('Post rooms', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .post('/api/room')
        .send({
            "number" : "Test1"
        })
        .end((err, res) => {
            res.should.have.status(412);

            let response = res.body;

            response.should.have.property('message');
            response.should.have.property('code').equals(412);
            response.should.have.property('datetime').equals(res.body.datetime);

            done();
        });
    });

    it('Should succeed when valid information is given', (done) => {
        chai.request(server)
        .post('/api/room')
        .send({
            "roomNumber" : 1,
            "seats" : 1
        })
        .end((err, res) => {
            res.should.have.status(200);

            idToDelete = res.body._id;

            done();
        });
    });
});

describe('Put rooms', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .put('/api/room/' + idToDelete)
        .send({
            "number" : "Test1"
        })
        .end((err, res) => {
            res.should.have.status(412);

            let response = res.body;

            response.should.have.property('message');
            response.should.have.property('code').equals(412);
            response.should.have.property('datetime').equals(res.body.datetime);

            done();
        });
    });
});

describe('Get rooms', () => {
    it('Should show all rooms', (done) => {
        chai.request(server)
        .get('/api/room')
        .end((err, res) => {
            res.should.have.status(200);

            done();
        })
    });
});

describe('Get room by Id', () => {
    it('Should succeed when valid information is given', (done) => {
        chai.request(server)
        .get('/api/room/' + idToDelete)
        .end((err, res) => {
            res.should.have.status(200)

            done();
        })
    });
});

describe('Delete rooms', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .del('/api/room/1')
        .end((err, res) => {
            res.should.have.status(412);

            let response = res.body;

            response.should.have.property('message');
            response.should.have.property('code').equals(412);
            response.should.have.property('datetime').equals(res.body.datetime);

            done();
        });
    });

    it('Should succeed when valid information is given', (done) => {
        console.log(idToDelete);
        chai.request(server)
        .del('/api/room/' + idToDelete)
        .end((err, res) => {
            res.should.have.status(200);

            done();
        });
    });
});
