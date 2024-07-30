/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app, Book) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      const result = await Book.aggregate([
        {
          $project: {
            title: 1,
            commentcount: { $size: "$comments"}
          }
        }
      ])
      res.send(result)
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      // console.log(req.body)
      if(!title) {
        return res.send('missing required field title')
      }
      const newBook = new Book({
        title
      })
      newBook.save()
      .then((doc) => {
        res.send({_id: doc._id, title: doc.title})
      })
      .catch(err => console.log())
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      Book.deleteMany().then(doc => {
        // console.log(doc)
        res.send('complete delete successful')
      }).catch(() => res.send('try again'))
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      Book.findById(bookid).select({__v: 0})
      .then((doc) => {
        res.send(doc)
      })
      .catch(err => {
        // console.log(err)
        return res.send('no book exists')
      })

      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        return res.send('missing required field comment')
      }
      Book.updateOne(
        { _id: bookid},
        { $push: { comments: comment} }
      ).then(doc => {
        res.redirect(`/api/books/${bookid}`)
      }).catch(err => {
        return res.send('no book exists')
      })
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.deleteOne(
        {_id: bookid}
      ).then(doc => {
        // console.log(doc)
        res.send('delete successful')
      }).catch(err => {
        // console.log(err)
        res.send('no book exists')
      })
      //if successful response will be 'delete successful'
    });
  
};
