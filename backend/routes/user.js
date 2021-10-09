const express = require('express');


const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');


router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
              res.status(401).json({"message":"Login failed"})
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);

                
                const body = { _id: user._id, username: user.username ,role:user.role};
                const token = jwt.sign({ user: body }, 'TOP_SECRET',{ expiresIn: '9h'});
  
                return res.json({ token,user:body });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );


  router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  );


  router.get(
    '/profile',
    (req, res, next) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
      })
    }
  );
  

module.exports = router;