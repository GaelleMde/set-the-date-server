# Project Name

## [Set the date - server](https://set-the-date.netlify.app)

![App Logo](your-image-logo-path-or-name)

## Description

**NOTE -** Describe your project in one/two lines.

#### [Client Repo here](https://github.com/GaelleMde/set-the-date)
#### [Server Repo here](https://github.com/GaelleMde/set-the-date-server)


## Technologies used

**NOTE -** This project was built using the MERN stack (MongoDB, Express.js, React, Node.js) along with the following tools and libraries: CSS, React Context, BootStrap, Cloudinary

# Server Structure

## Models

User model

```javascript
name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [20, "Name must be less than 20 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    favorites: 
  [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Event'
  }],
 
 

  
```

Event Model 

```javascript
name: {
    type: String,
    required: [true, 'Event name is required'],
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
  }
```
Comment model

```javascript
user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },

  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required'],
  },

  text: {
    type: String, 
    required: [true, 'Comment text is required'],
  } 

  
  
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/comment`              |     |             |       |    Creates comments                           |
| POST        | `/event`               |         |            |     | Creates events (admin only)                |
| GET         | `/event`                     |               |          |        | List of all the events by date                  |
| GET        | `/event/:eventId`        |          |         |       | Get the details of one event                                   |
| GET         | `user/favorite`  |          |    |     | List of all the favorites tournaments of one user                                        |
| GET         | `/comment/event/:eventId`             |             |       |   | List all the comments of one event
| GET | `/event/:eventId`             |        | 2    |   | Edit the details of one event (admin only)                                        |
| DELETE      | `/event/:enventId`     |        |           |      | Delete one event (admin only)                                     |
| PATCH        | `user/favorite/:eventId/add`     |        |         |     | Add a event to favorite                                         |
| PATCH       | `user/favorite/:eventId/remove`      |        |       |      | Remove event from favorite          |
| POST        | `/auth/signup`                  |           |       |         | Creates an user                               |
| POST   | `/auth/login`           |                              |            |       |                |
| GET  | `/api/auth/verify`           |                              |            |       |    Verify Token Validity           |
  
## Links

### Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link Client](https://github.com/GaelleMde/set-the-date)

[Repository Link Server](https://github.com/GaelleMde/set-the-date-server)

[Deploy Link](https://set-the-date.netlify.app/)


### Slides

[Slides Link](www.your-slides-url-here.com)