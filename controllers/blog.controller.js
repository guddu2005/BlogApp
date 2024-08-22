const { Blog } = require("../models/blog.model");



const blogIndex = (req, res) => {
    Blog.find()
        .populate("author")
        .then(blogs => {
            res.render('blog/index', { blogs  });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send();
        });
};

const blogCreaterGet = (req, res) => {
    res.render("blog/new");
};
// 
const blogCreatePost = async (req, res) => {
    const { title, body } = req.body;

    if (title && body) {
        const blog = new Blog({ body, title, author: req.user._id });
        try {
            await blog.save();
            res.redirect("/blog");
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        req.flash("error_msg", "Title and body are required.");
        res.redirect("/blog/new");
    }
};

const blogDetails = (req, res) => {
    const { id } = req.params;
    Blog.findById(id)
        .then(blog => {
            if (blog) {
                res.render("blog/detail", { blog });
            } else {
                req.flash("error_msg", "Blog not found.");
                res.redirect("/blog");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
};

//Edit page get
const blogEditGet = (req, res) => {
    const { id } = req.params;
    console.log('Id:' ,id)

    Blog.findById(id)
        .then(blog => {
            if (!blog) {
                req.flash("error_msg", "Blog not found.");
                return res.redirect("/blog");
            }

            if (!blog.author || !req.user._id) {
                req.flash("error_msg", "User not authenticated.");
                return res.redirect("/blog")
            }
            if (blog.author.toString() === req.user._id) {
                res.render("blog/edit", { blog });
            } else {
                req.flash("error_msg", "Not Authorized");
                res.redirect("/blog");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
};


const blogEditPut = (req, res) => {
    const { id } = req.params;
    const { body, title } = req.body;

    if (body && title) {
        Blog.findById(id)
            .then(blog => {
                if (!blog) {
                    req.flash("error_msg", "Blog not found.");
                    return res.redirect("/blog");
                }
                if (!blog.author || !req.user._id) {
                    req.flash("error_msg", "User not Authorized.");
                    return res.redirect("/blog")
                }

                if (blog.author.toString() === req.user._id) {
                    blog.title = title;
                    blog.body = body;
                    return blog.save();
                } else {
                    req.flash("error_msg", "Not Authorized");
                    return res.redirect("/blog");
                }
            })
            .then(() => res.redirect(`/blog/${id}`))
            .catch(err => {
                console.error(err);
                res.status(500).send("Internal Server Error");
            });
    } else {
        req.flash("error_msg", "Title and body are required.");
        res.redirect(`/blog/${id}/edit`);
    }
};


//Delete Blog
const blogDelete = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the blog by ID
        const blog = await Blog.findById(id);
        
        if (!blog) {
            req.flash("error_msg", "Blog not found.");
            return res.redirect("/blog");
        }

        if (!blog.author || !req.user._id) {
            req.flash("error_msg", "User not Authorized.");
            return res.redirect("/blog"); 
        }

        if (blog.author.toString() === req.user._id.toString()) {
            await Blog.findByIdAndDelete(id);
            return res.redirect("/blog");
        } else {
            req.flash("error_msg", "Not Authorized");
            return res.redirect("/blog");
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    blogIndex,
    blogCreaterGet,
    blogCreatePost,
    blogDetails,
    blogEditGet,
    blogEditPut,
    blogDelete
};
