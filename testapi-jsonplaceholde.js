var request = require('supertest')('https://jsonplaceholder.typicode.com');

describe('jsonplaceholder api test',function(){
  //this.timeout(30000);

  before('go to jsonplaceholder page',function(done){
    request.get('/')
      .expect(200,done);
  });

  it('get /posts/1',function(done){
    request.get('/posts/1')
      .expect(200)
      .expect({
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }, done);
  });

  it('get verify /posts/1 userid and title',function(done){
    request.get('/posts/1').expect(function(res){
    if (!('userId' in res.body) && !('title' in res.body)){
      throw new Error('not have userid and title');
    }
   })
   .end(done);
  });

  it('post /posts',function(done){
    request.post('/posts')
      .expect(201,done);
  });

  it('post /posts/10 check header',function(done){
    request
    .post('/posts/10')
    .send({"title":"el"})
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      res.body.should.have.property('title');
       },done());
  });

  it('create /posts userid',function(done){
    request.post('/posts/11')
    .send({"userId": 11,
    "id": 110,
    "title": "etitle",
    "body": "eboday"})
    .end(function(err, res) { 
        if (err) {
            throw err;
          }
          res.body.userId = '11';
          },done());
   });

   it('updates /posts/15 ', function(done) {
    request.put('/posts/15')
        .send({
            userId: 1,
            title: 'testapi'
        })
        .expect(201)
        .end(function(err, res) {
            done(err);
        });
    }); 

  it('put /posts/5',function(done){
    request.put('/posts/5')
      .expect(function(res){
        if (res.statusCode !== 200 && res.statusCode !== 201) {
          throw Error('unexpected status code: ' + res.statusCode);
        }},done);
  });  

  it('patch /post/10',function(done){
    request.patch('/posts/10')
      .expect(200,done);
  });

  it('delete /post/12',function(done){
    request.delete('/posts/12')
      .expect(200,done);
  });

});
