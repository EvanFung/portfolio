//<!--  WEN HAO FENG 301223017 -->
var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');



router.post('/register',(req, res, next) => {
  User.register(new User({username:req.body.username,email:req.body.email}),req.body.password, (err, user) => {
    if(err) {
      return res.json({error: err});
    }
    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {
        if(err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.post('/login',passport.authenticate('local', { failureRedirect: '/user/login',successRedirect:'/business',failureFlash:true}), (req, res, next) => {
  req.session.save((err) => {
      if (err) {
          return next(err);
      }
      req.session.user = req.user;
  });
});

router.get('/logout',function(req,res) {
  req.logout();
  req.flash('success','Logged you out');
  res.redirect('/');
});

router.get('/login',function(req, res, next) {
  res.render('login/login', {user:req.user, message:req.flash('error')});
});

module.exports = router;
