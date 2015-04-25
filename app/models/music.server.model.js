'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Music Schema
 */
var MusicSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Music name',
		trim: true
	},
	url: {

		type: String,
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	comments: [
		  {
		    
		    comment: {
				  type: String,
				  default: '',
				  required: 'Please fill Music name',
				  trim: true
			  },
			
		  	created: {
		  		type: Date,
			  	default: Date.now
			  },
			  user: {
			  	type: String
				  
			  }  
		  }
		  ]
		});

mongoose.model('Music', MusicSchema);