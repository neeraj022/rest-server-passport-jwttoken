var express=require('express');
var mongoose=require('mongoose');
var Dishes=require('../models/dishes');

var dishRouter=express.Router();

dishRouter.route('/')
.get( function(req,res,next)
	{
		Dishes.find({}, function(err, dish){
			if (err) throw err;
			res.json(dish);
		});
	})
.delete(function(req,res,next)
	{
		Dishes.remove({}, function(err, resp){
			if (err) throw err;
			res.json(resp);
		});
	})
.post(function(req,res,next)
	{
		Dishes.create(req.body, function(err, dish)
			{
				if (err) throw err;
				console.log('Dish created');
				var id=dish._id;
				res.writeHead(200, {'Content-type': 'text/plaing'});
				res.end('Added the dish with id: '+id);
			});
	});

dishRouter.route('/:dishId')
.get( function(req,res,next)
	{
		Dishes.findById(req.params.dishId, function(err, dish){
			if (err) throw err;
			res.json(dish);
		});
	})
.delete(function(req,res,next)
	{
		Dishes.remove(req.params.dishId, function(err, dish){
			if(err) throw err;
			res.json(dish);
		});
	})
.put( function(req,res,next)
	{	Dishes.findByIdAndUpdate(req.params.dishId, {
		$set: req.body
	}, {
		new: true
	}, function(err, dish){
		if(err) throw err;
		res.json(dish);
	});
	});

dishRouter.route('/:dishId/comments')
.get( function(req,res,next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if (err) throw err;
		res.json(dish.comments);
	});
})
.post(function(req,res,next){
	Dishes.findById(req.params.dishId, function(err,dish){
		if(err) throw err;
		dish.comments.push(req.body);
		dish.save(function(errIn, dishIn){
			if(errIn) throw errIn;
			console.log(' Added Comments');
			console.log(dish);
			res.json(dishIn);
		});
	});
})
.delete(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		for (var i=(dish.comments.length-1); i>=0; i--)
		{
			dish.comments.id(dish.comments[i]._id).remove();
		}
		dish.save( function(errIn, dishIn){
			if(err) throw err;
			res.writeHead(200, {'Content-type': 'text/plaing'});
			res.end(' Deleted all comments');
		});
	});
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function(req,res,next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		res.json(dish.comments.id(req.params.commentId));
	});
})
.put(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;

		dish.comments.id(req.params.commentId).remove();
		dish.comments.push(req.body);
		dish.save(function(errIn, dishIn){
			if(err) throw err;
			console.log('Updated comments');
			console.log(dish);
			res.json(dish);
		});
	})
})
.delete(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;

		dish.comments.id(req.params.commentId).remove();
		dish.save(function(errIn, dishIn){
			if(err) throw err;
			console.log('Deleted comments');
			console.log(dish);
			res.json(dish);
		});
	})
});

module.exports=dishRouter;