const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
let idToDelete;

chai.should();
chai.use(chaiHttp);

describe('Post movies', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .post('/api/movie')
        .send({
            "title" : "Test1"
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
        .post('/api/movie')
        .send({
            "title" : "Test1",
            "description" : "Test1",
            "director" : "Test1",
            "writers" : "Test1",
            "imdbScore" : 5,
            "length" : 240
        })
        .end((err, res) => {
            res.should.have.status(200);

            idToDelete = res.body._id;

            done();
        });
    });
});

describe('Put movies', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .put('/api/movie/' + idToDelete)
        .send({
            "title" : "Test1"
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
        .put('/api/movie/' + idToDelete)
        .send({
            "title" : "Test2",
            "description" : "Test1",
            "director" : "Test1",
            "writers" : "Test1",
            "imdbScore" : 5,
            "length" : 240
        })
        .end((err, res) => {
            res.should.have.status(200);

            done();
        });
    });
});

describe('Get movies', () => {
    it('Should show all movies', (done) => {
        chai.request(server)
        .get('/api/movie')
        .end((err, res) => {
            res.should.have.status(200);

            done();
        })
    });
});

describe('Get movie by Id', () => {
    it('Should succeed when valid information is given', (done) => {
        chai.request(server)
        .get('/api/movie/' + idToDelete)
        .end((err, res) => {
            res.should.have.status(200)

            done();
        })
    });
});

describe('Delete movies', () => {
    it('Should throw an error when invalid information is given', (done) => {
        chai.request(server)
        .del('/api/movie/1')
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
        .del('/api/movie/' + idToDelete)
        .end((err, res) => {
            res.should.have.status(200);

            done();
        });
    });
});
