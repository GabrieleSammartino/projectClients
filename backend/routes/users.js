var express = require('express');
var User = require('../models/User');
var router = express.Router();

router.get('/', function(req, res) {
  User.find({}, function(err,users){
    if(err) return res.status(500).json({error: err});
    res.json(users);
  });
});
router.get('/:id', function(req, res) {
  User.find({_id:req.params.id}, function(err,users)
  {
    if(err) return res.status(500).json({message: 'Utente non trovato'});
    res.json(users);
  });
});
router.post('/', function (req, res) {
  var newUser = User(req.body);
  newUser.save(function(err){
    res.status(201).json(newUser + err) ;
  })
});
router.put('/:id',function(req,res,next) {
  User.findOne({_id: req.params.id}).exec(function (err, User) {
    if (err) return res.status(500).json({message: 'Utente non trovato'});
    if (!User) return res.status(404).json({message: 'Utente non trovato'});
    for (key in req.body) {
      User[key] = req.body[key];
    }
    User.save(function (err) {
      if (err) return res.status(500).json({message: 'Non riesco a salvare'});
      res.json(User);
    })
  });
});

router.delete('/:id', function (req, res, next) {
  User.remove({_id: req.params.id}, function(err){
    if(err) return response.status(500).json({message:'Utente non trovato'});
    res.json({message : 'Utente eliminatao correttamente'})
  })
});

module.exports = router;
