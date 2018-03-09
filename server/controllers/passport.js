var models = require('../models');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	passport.serializeUser(function(user,done){
		done(null, user);
	});

	passport.deserializeUser(function(obj,done){
		done(null, obj);
	});

	passport.use('local-signin', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			models.User.findOne({where: {username: username}}).then(function(user){
				if(!user)
					return done(null, false, {message: 'Username Does not Exist'});
		        if (!bcrypt.compareSync(password, user.get('password_hash'))){
		          return done(null, false, {message: 'Incorrect Password. Try Again.'});
		        }
				return done(null, user);
			});
		});
	}));

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			models.User.findOne({where: {username: username}}).then(function(user){
				if(user){
					return done(null, false, req.flash('signupMessage', 'That username already taken'));
				} else {
	  				return models.User.create({
	  					username: username,
	  					password: password,
	  				}).then(function(newUser){
	  					return done(null, newUser)
						}).catch(function(err){
							console.error(err);
						});
				};
	  		});
	    });
	}));

}
