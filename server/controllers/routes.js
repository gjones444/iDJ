var path = require('path');

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

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



	app.get('/api/playlist/', (req,res) => {
		var songs = `SELECT * FROM "added_songs"`;
	  pgClient.query(songs, (error,queryRes) => {
			if(error){
				console.log("Did not work")
				res.json({error: error})
			} else {
				res.json({playlist: queryRes})
			}
		});
	});


	app.post('/api/add-song', (req,res) => {
		console.log(req.body)
		var insertQuery = 'INSERT INTO "added_songs" (song, song_id, uri, artwork, votes_count) VALUES ($1,$2,$3,$4,$5)';
		pgClient.query(insertQuery, [req.body.song, req.body.song_id, req.body.uri, req.body.artwork, req.body.votes_count]);
	});

	app.put('/api/vote-up-down/:id', (req,res) => {
		console.log(req.body)
	pgClient.query('UPDATE "added_songs" SET votes_count=$1 WHERE id=' + req.params.id, [req.body.votectn], (err,results) => {
		if(err){
			res.json(err)
		}
		res.json({voteUpdated: "Success"})
	});
});


	app.get('*', function(req,res){
		res.sendFile(path.join(__dirname, './../../client/public/index.html'));
	});

}
