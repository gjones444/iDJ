var pg = require('pg');
var express = require('express');
var path = require('path');
var router = express.Router();
var dbUrl;
var models = require('./../models');
models.sequelize.sync();

if(process.env.DATABASE_URL){
	dbUrl = process.env.DATABASE_URL
} else {
	dbUrl = {
		user: process.argv.POSTGRES_USER,
		password: process.argv.POSTGRES_PASSWORD,
		database: 'iDJ',
		host: 'localhost',
		port: 5432
	}
}

var pgClient = new pg.Client(dbUrl);
pgClient.connect();

var path = require('path');

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = (app, passport) => {

	app.get('/', function(req,res){
		res.sendFile(path.join(__dirname, './../../client/public/index.html'));
	});

	app.get('/api/sign-up', function(req,res){
		if(req.user){
			res.json({message: 'signed-in', user_id: req.user.id});
		}
	});

	app.get('/api/sign-in', function(req,res){
		if(req.user){
			res.json({message: 'signed-in', user_id: req.user.id});
		}
	});

	app.post('/api/sign-up', function(req,res,next){
		passport.authenticate('local-signup', function(err, user, info){
			if (err) {
				return next(err);
			} else {
				res.json({user: user, info: info})
			}
		})(req, res, next);
	});

	app.post('/api/sign-in', function(req,res,next){
		passport.authenticate('local-signin', function(err, user, info){
		    if (err) {
		      	return next(err);
		    }
		    if (!user) {
		    	return res.status(401).json({ success : false, message : 'authentication failed', info: info });
		    }
		    req.login(user, function(err){
				if(err){
					return next(err);
				}
		      return res.status(200).json({ success : true, message : 'authentication succeeded', object : user });
			});
	  	})(req, res, next);
	});

	app.get('/api/signed-in', (req,res) => {
		if(req.user){
			res.json({message: 'signed-in', user: req.user});
		} else {
			res.json({message: 'no req.user'})
		}
	})

	app.delete('/api/logout', function (req, res) {
		req.session.destroy(function(){
			res.status(204).send();
		});

	});

	app.delete('/api/remove-playlist', function (req, res) {
		var songs = `DELETE * FROM "added_songs"`;
	  pgClient.query(songs, (error,queryRes) => {
			if(error){
				res.json({error: error})
			} else {
				res.json({playlist: queryRes})
			}
		});
	});

	app.get('/api/playlist/', (req,res) => {
		models.Song.findAll({order: [
						['votes_count', 'DESC']
				]}).then(function(songs){
			console.log(songs)
		res.json(songs);
	});
 	});

	app.post('/api/add-song', (req,res) => {
		models.Song.create({
			song: req.body.song,
	    song_id: req.body.song_id,
	    uri: req.body.uri,
	    artwork: req.body.artwork,
	    votes_count: req.body.votes_count,
		}).then(function(message){
			models.Song.findAll({order: [
	            ['votes_count', 'DESC']
	        ]}).then(function(songs){
				console.log(songs)
				res.json(songs);
			});
		});
	})

	app.put('/api/vote-up-down/:id', (req,res) => {

		models.Song.update({votes_count: req.body.voteCtn}, {where:{id: req.params.id}}).then(function(success){
			models.Song.findAll({order: [
	      ['votes_count', 'DESC']
	    ]}).then((added_song) => {
				console.log(added_song)
				res.json(added_song);
			})
	})

})

	app.post('/api/sign-in', function(req, res) {
	var queried = `SELECT * FROM users.username WHERE username='${req.body.user}'`;
	pgClient.query(queried, (err, queryRes) => {
	    if (req.body.user !== '' && req.body.pass !== '') {
	      pgClient.query(queried, [req.body.user, req.body.pass], (err2, queryRes1) => {
	        if (err2) {
	          res.json(err2)
	        } else {
	          res.json(queryRes1)
	        }
	        console.log(queryRes1)
	      });
	    }
	  })
	})

	app.get('*', function(req,res){
		res.sendFile(path.join(__dirname, './../../client/public/index.html'));
	});

}
