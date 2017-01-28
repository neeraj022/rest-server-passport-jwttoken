var express=require('express');
var leaderRouter=express.Router();

leaderRouter.route('/')
.all(function(req,res,next)
	{
		res.writeHead(200, {'Content-type': 'text/plain'});
		next();
	})
.get( function(req,res,next)
	{
		res.end('Will get u all the leaders');
	})
.delete(function(req,res,next)
	{
		res.end('Will delete all the leaders');
	})
.post(function(req,res,next)
	{
		res.end('Will add the leader '+req.body.name+' with description of '+req.body.description);
	});

leaderRouter.route('/:leaderId')
.all(function(req,res,next)
	{
		res.writeHead(200, {'Content-type': 'text/plain'});
		next();
	})
.get( function(req,res,next)
	{
		res.end('Will get u the leader '+req.params.leaderId);
	})
.delete(function(req,res,next)
	{
		res.end('Will delete the leader '+req.params.leaderId);
	})
.put( function(req,res,next)
	{
		res.end('Will update the leader '+req.params.leaderId+' with name '+req.body.name+' with description of '+req.body.description);
	});
module.exports=leaderRouter;