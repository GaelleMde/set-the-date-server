const mongoose = require("mongoose")

const {Schema, model } = require ("mongoose")

const eventSchema = new Schema ({

  name: {
    type: String,
    required: [true, 'Event name is required'],
    minlength: [3, 'Event name must be at least 3 characters'],
    maxlength: [50, 'Event name cannot exceed 50 characters'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['ATP', 'WTA'],
    required: [true, 'Category is required'],
  },
  surface: {
    type: String,
    enum: ['Hard', 'Clay', 'Grass'],
    required: [true, 'Surface is required'],
  },
  level: {
    type: String,
    enum: ['Grand Slam', '1000', '500', '250'],
    required: [true, 'Level is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
    city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  prizeMoney: {
    type: Number,
    required: [true, 'Prize money is required'],
    min: [0, 'Prize money cannot be negative']
  },
  currentChampion: {
    type: String,
    trim: true,
    
  },
  ImageUrl: {
    type: String,
    trim: true,
    default: ''
  },



})

const Event = model("Event", eventSchema)

module.exports = Event