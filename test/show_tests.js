const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
let idToDelete;
let movieId = '5c1043e25f0e9c23d8a6e05a';
let roomId = '5c1043f35f0e9c23d8a6e05b';

chai.should();
chai.use(chaiHttp);

describe('Post shows', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .post('/api/show/movie/' + movieId + '/room/' + roomId)
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
        .post('/api/show/movie/' + movieId + '/room/' + roomId)
        .send({
            "movie" : "test1",
            "date" : "dd-mm-yyyy hh:mm"
        })
        .end((err, res) => {
            res.should.have.status(200);

            idToDelete = res.body._id;

            done();
        });
    });
});

describe('Put shows', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .put('/api/show/' + idToDelete)
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

describe('Get shows', () => {
    it('Should show all shows', (done) => {
        chai.request(server)
        .get('/api/show')
        .end((err, res) => {
            res.should.have.status(200);

            done();
        })
    });
});

describe('Get show by Id', () => {
    it('Should succeed when valid information is given', (done) => {
        console.log(idToDelete)
        chai.request(server)
        .get('/api/show/' + idToDelete)
        .end((err, res) => {
            res.should.have.status(200)

            done();
        })
    });
});

describe('Delete shows', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .del('/api/show/' + idToDelete + '/movie/' + movieId + '/room/' + roomId)
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
        .del('/api/show/' + idToDelete + '/movie/' + movieId + '/room/' + roomId)
        .end((err, res) => {
            res.should.have.status(200);

            done();
        });
    });
});