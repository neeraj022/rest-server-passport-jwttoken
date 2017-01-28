var express=require('express');
var promoRouter=express.Router();

promoRouter.route('/')
.all(function(req,res,next)
	{
		res.writeHead(200, {'Content-type': 'text/plain'});
		next();
	})
.get( function(req,res,next)
	{
		res.end('Will get u all the promos');
	})
.delete(function(req,res,next)
	{
		res.end('Will delete all the promos');
	})
.post(function(req,res,next)
	{
		res.end('Will add the promo '+req.body.name+' with description of '+req.body.description);
	});

promoRouter.route('/:promoId')
.all(function(req,res,next)
	{
		res.writeHead(200, {'Content-type': 'text/plain'});
		next();
	})
.get( function(req,res,next)
	{
		res.end('Will get u the promo '+req.params.promoId);
	})
.delete(function(req,res,next)
	{
		res.end('Will delete the promo '+req.params.promoId);
	})
.put( function(req,res,next)
	{
		res.end('Will update the promo '+req.params.promoId+' with name '+req.body.name+' with description of '+req.body.description);
	});
module.exports=promoRouter;