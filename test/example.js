process.env.TESTENV = true

let Review = require('../app/models/review.js')
let User = require('../app/models/user')

const crypto = require('crypto')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
chai.should()

chai.use(chaiHttp)

const token = crypto.randomBytes(16).toString('hex')
let userId
let exampleId

describe('Examples', () => {
  const exampleParams = {
    title: '13 JavaScript tricks SEI instructors don\'t want you to know',
    text: 'You won\'believe number 8!'
  }

  before(done => {
    Review.deleteMany({})
      .then(() => User.create({
        email: 'caleb',
        hashedPassword: '12345',
        token
      }))
      .then(user => {
        userId = user._id
        return user
      })
      .then(() => Review.create(Object.assign(exampleParams, {owner: userId})))
      .then(record => {
        exampleId = record._id
        done()
      })
      .catch(console.error)
  })

  describe('GET /reviews', () => {
    it('should get all the reviews', done => {
      chai.request(server)
        .get('/reviews')
        .set('Authorization', `Token token=${token}`)
        .end((e, res) => {
          res.should.have.status(200)
          res.body.reviews.should.be.a('array')
          res.body.reviews.length.should.be.eql(1)
          done()
        })
    })
  })

  describe('GET /reviews/:id', () => {
    it('should get one review', done => {
      chai.request(server)
        .get('/reviews/' + exampleId)
        .set('Authorization', `Token token=${token}`)
        .end((e, res) => {
          res.should.have.status(200)
          res.body.review.should.be.a('object')
          res.body.review.title.should.eql(exampleParams.title)
          done()
        })
    })
  })

  describe('DELETE /reviews/:id', () => {
    let exampleId

    before(done => {
      Review.create(Object.assign(exampleParams, { owner: userId }))
        .then(record => {
          exampleId = record._id
          done()
        })
        .catch(console.error)
    })

    it('must be owned by the user', done => {
      chai.request(server)
        .delete('/reviews/' + exampleId)
        .set('Authorization', `Bearer notarealtoken`)
        .end((e, res) => {
          res.should.have.status(401)
          done()
        })
    })

    it('should be succesful if you own the resource', done => {
      chai.request(server)
        .delete('/reviews/' + exampleId)
        .set('Authorization', `Bearer ${token}`)
        .end((e, res) => {
          res.should.have.status(204)
          done()
        })
    })

    it('should return 404 if the resource doesn\'t exist', done => {
      chai.request(server)
        .delete('/reviews/' + exampleId)
        .set('Authorization', `Bearer ${token}`)
        .end((e, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('POST /reviews', () => {
    it('should not POST an review without a title', done => {
      let noTitle = {
        text: 'Untitled',
        owner: 'fakedID'
      }
      chai.request(server)
        .post('/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send({ review: noTitle })
        .end((e, res) => {
          res.should.have.status(422)
          res.should.be.a('object')
          done()
        })
    })

    it('should not POST an review without text', done => {
      let noText = {
        title: 'Not a very good review, is it?',
        owner: 'fakeID'
      }
      chai.request(server)
        .post('/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send({ review: noText })
        .end((e, res) => {
          res.should.have.status(422)
          res.should.be.a('object')
          done()
        })
    })

    it('should not allow a POST from an unauthenticated user', done => {
      chai.request(server)
        .post('/reviews')
        .send({ review: exampleParams })
        .end((e, res) => {
          res.should.have.status(401)
          done()
        })
    })

    it('should POST an review with the correct params', done => {
      let validExample = {
        title: 'I ran a shell command. You won\'t believe what happened next!',
        text: 'it was rm -rf / --no-preserve-root'
      }
      chai.request(server)
        .post('/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send({ review: validExample })
        .end((e, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('review')
          res.body.review.should.have.property('title')
          res.body.review.title.should.eql(validExample.title)
          done()
        })
    })
  })

  describe('PATCH /reviews/:id', () => {
    let exampleId

    const fields = {
      title: 'Find out which HTTP status code is your spirit animal',
      text: 'Take this 4 question quiz to find out!'
    }

    before(async function () {
      const record = await Review.create(Object.assign(exampleParams, { owner: userId }))
      exampleId = record._id
    })

    it('must be owned by the user', done => {
      chai.request(server)
        .patch('/reviews/' + exampleId)
        .set('Authorization', `Bearer notarealtoken`)
        .send({ review: fields })
        .end((e, res) => {
          res.should.have.status(401)
          done()
        })
    })

    it('should update fields when PATCHed', done => {
      chai.request(server)
        .patch(`/reviews/${exampleId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ review: fields })
        .end((e, res) => {
          res.should.have.status(204)
          done()
        })
    })

    it('shows the updated resource when fetched with GET', done => {
      chai.request(server)
        .get(`/reviews/${exampleId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.review.title.should.eql(fields.title)
          res.body.review.text.should.eql(fields.text)
          done()
        })
    })

    it('doesn\'t overwrite fields with empty strings', done => {
      chai.request(server)
        .patch(`/reviews/${exampleId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ review: { text: '' } })
        .then(() => {
          chai.request(server)
            .get(`/reviews/${exampleId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((e, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              // console.log(res.body.review.text)
              res.body.review.title.should.eql(fields.title)
              res.body.review.text.should.eql(fields.text)
              done()
            })
        })
    })
  })
})
