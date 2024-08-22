const express = require("express");
const blogController = require("../controllers/blog.controller");
const blogRouter = express.Router();
const { restrictToLoggedUserOnly, checkAuth } = require('../Middleware/auth');



// Route to get all blogs
blogRouter.get('/', blogController.blogIndex);

// Route to get the form for creating a new blog
blogRouter.get('/new',restrictToLoggedUserOnly, blogController.blogCreaterGet);

// Route to create a new blog (POST request)
blogRouter.post('/',restrictToLoggedUserOnly, blogController.blogCreatePost);

// Route to get details of a specific blog by ID
blogRouter.get('/:id', blogController.blogDetails);

// Route to get the form to edit a specific blog by ID
blogRouter.get('/:id/edit',restrictToLoggedUserOnly, blogController.blogEditGet);

// Route to update a specific blog by ID
blogRouter.put('/:id',restrictToLoggedUserOnly, blogController.blogEditPut);

// Route to delete a specific blog by ID
blogRouter.delete('/:id',restrictToLoggedUserOnly, blogController.blogDelete);

module.exports = {
    blogRouter,
};
