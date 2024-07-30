'use strict';

const ObjectId = require("mongodb").ObjectId;
const date = new Date();

  module.exports = function (app, myDatabase) {
    
    app.route('/api/issues/:project')
    
    .get(async function (req, res){
      let project = req.params.project;
      let query = req.query;
      if(!query.open) {
        res.send({error: 'invalid query'})
      } else {
        query = (query.open == 'true'? true : query.open == 'false' ? false : 'none')
        const respose = await myDatabase.find({open: query }).toArray();
        console.log(respose)
        return res.send(respose)
      }
      console.log(query);
      const respose = await myDatabase.find().toArray(); 
      res.send(respose)
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let issue = req.body;
      if ( ! issue.issue_title || ! issue.created_by || ! issue.issue_text ) {
        return res.send({error: 'required field(s) missing'})
      }
      console.log(project)
      const issueDetails = {
        issue_title: issue.issue_title,
        open: true,
        issue_text: issue.issue_text,
        created_by: issue.created_by,
        assigned_to: issue.assigned_to || '',
        status_text: issue.status_text || '',
        created_on: date.toISOString(),
        updated_on: date.toISOString()
      }
      
      myDatabase.insertOne(issueDetails, (err, doc) => {
        if (err) {return console.log(err);}
      }).then(result => myDatabase.findOne({_id: result.insertedId}))
        .then(doc => {
          res.send(doc)
        })
    })
    
    .put(async function (req, res){
      let project = req.params.project;
      let id = req.body._id;
      let update = req.body;
      if (!update._id) {
        res.send({error: 'missing _id'})
      }
      // let data = await myDatabase.find({_id: req.body._id}).toArray();
      // myDatabase.findOne({_id: new ObjectId(update._id)}).then(doc => console.log(doc))
      // console.log(data);
      // if (!data) {
      //   return 
      // }
      delete update._id;
      if (update.issue_title == '') delete update.issue_title;
      if (update.issue_text == '') delete update.issue_text;
      if (update.created_by == '') delete update.created_by;
      if (update.assigned_to == '') delete update.assigned_to;
      if (update.status_text == '') delete update.status_text;
      if (update.open) {
        if (update.open == 'true') {
          update.open = true;
        }
        else update.open = false
      }
      update.updated_on = date.toISOString();
      console.log(update)
      try {
        const upd =await myDatabase.updateOne(
          { _id: new ObjectId(id)},
          { $set : update}
        )
        res.send({result: 'successfully updated', _id: id})

      }catch(err) {
        console.error(err)
        res.send({error: 'could not update', _id: id})
      }
      
    })
    
    .delete(async function (req, res){
      let project = req.params.project;
      console.log(req.body)
      if (!req.body._id) {
        return res.send({error: 'missing _id'})
      }
      

      try{
        const del = await myDatabase.deleteOne({_id: new ObjectId(req.body._id)})
        console.log(del);
        if (del.deletedCount == 1) {
          res.send({ result: 'successfully deleted', _id: req.body._id})
        }
      }catch (err) {
        console.log(err)
        res.send({result: 'could not delete', _id: req.body._id})

      }
      
    });
    
  };
