import { Template } from 'meteor/templating';

import { TT } from '../api/tasks.js';
import { Tasks } from '../api/tasks.js';
 
import './task.js';
import './body.html';
 
//var game = {player1: '', player2: '', set1: 0, set2: 0, points1: 0, points2: 0};
Template.body.helpers({
  tasks() {
    return Tasks.find({}, {sort: { createdAt: -1 } });
  },
  games() {
    //return game;
    return TT.findOne({});
    //return 'haha'
    //return Tasks.find({}, {sort: { createdAt: -1 } });
    
  },
});

Template.game.helpers({
  calculate_serve() {
  sets= this.set1 + this.set2;
  points= this.score1 + this.score2;
  if(points>20)
	inverter= (sets + points - 20)%2;
  else
	inverter= (sets + Math.floor(points/2))%2;
  
  return (this.serve)^inverter;
  },
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD/MM HH:MM');
});

Template.body.events({
  'submit .new-update'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});

function calculate_serve() {
  //sets= game.set1 + game.set2;
  //points= game.score1 + game.score2;
  //if(points>20)
//	inverter= (sets + points - 20)%2;
 // else
//	inverter= (sets + Math.floor(points/2))%2;
  
  //return (game.serve)^inverter;
  return 1;

}

Template.game.events({
  'submit .player1'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    TT.update(
     this._id, {
     $set: { player1: text},
    });
 
    // Clear form
    //target.text.value = 'hehe';
  },
  'submit .player2'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    TT.update(
     this._id, {
     $set: { player2: text},
    });
 
    // Clear form
    //target.text.value = 'hehe';
  },
  'click .score1inc'() {
    TT.update(
     this._id, {
     $inc: { score1: 1},
    });
  },
  'click .score1dec'() {
    TT.update(
     this._id, {
     $inc: { score1: -1},
    });
  },
  'click .score2inc'() {
    TT.update(
     this._id, {
     $inc: { score2: 1},
    });
  },
  'click .score2dec'() {
    TT.update(
     this._id, {
     $inc: { score2: -1},
    });
  },
  'click .set1inc'() {
    TT.update(
     this._id, {
     $inc: { set1: 1},
     $set: { score1: 0, score2: 0},
    });
  },
  'click .set1dec'() {
    TT.update(
     this._id, {
     $inc: { set1: -1},
    });
  },
  'click .set2inc'() {
    TT.update(
     this._id, {
     $inc: { set2: 1},
     $set: { score1: 0, score2: 0},
    });
  },
  'click .set2dec'() {
    TT.update(
     this._id, {
     $inc: { set2: -1},
    });
  },
  'click .reset'() {
    TT.update(
     this._id, {
     $set: { player1: 'player1', player2: 'player2', score1: 0, score2: 0, set1: 0, set2: 0},
    });
  },
  'click .serve'() {
    TT.update(
     this._id, {
     $set: { serve: ! this.serve},
    });
  },
});
