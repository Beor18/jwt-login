let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

// Testeando api rest: registrar usuario
describe('/ POST /api/users/register', () => {
    it('Se ha registrado un usuario', (done) => {
        chai.request(url)
            .post('/api/users/register')
            .send({ id: 0, name: "Prueba", email: "testing@demo.com", password: "12345678", password_confirm: "12345678" })
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});