// const LocalStrategy = require("passport-local").Strategy;
// const { Author } = require("../models/author.model");

// module.exports = function (passport) {
//   passport.serializeUser((author, done) => {
//     done(null, author.id);
//   });

//   passport.deserializeUser((id, done) => {
//     Author.findById(id, (err, author) => {
//       done(err, author);
//     });
//   });

//   passport.use(
//     "local-signup",
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     (req, email, password, done) => {
//       Author.findOne({ email }, async (err, author) => {
//         if (err) return done(err);
//         if (author)
//           return done(
//             null,
//             false,
//             req.flash("signup message", "This email is already taken")
//           );
//         const newAuthor = new Author({
//           name: req.body.name,
//           email,
//           password,
//         });
//         await newAuthor.save();
//         return done(null, author);
//       });
//     }
//   );

//   passport.use(
//     "local-login",
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     (req, email, password, done) => {
//       Author.findOne({ email }, async (err, author) => {
//         if (err) return done(err);
//         if (!author)
//           return done(null, false, req.flash("login message", "No user found"));
//         author.comparePassword(password, (err, isMatch) => {
//           if (err) return done(err);
//           if (!isMatch)
//             return done(
//               null,
//               false,
//               req.flash("login message", "Email and password do not match")
//             );
//           return done(null, author);
//         });
//       });
//     }
//   );
// };


const LocalStrategy = require("passport-local").Strategy;
const { Author } = require("../models/author.model");

module.exports = function (passport) {
  passport.serializeUser((author, done) => {
    done(null, author.id);
  });

  passport.deserializeUser((id, done) => {
    Author.findById(id, (err, author) => {
      done(err, author);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        Author.findOne({ email }, async (err, author) => {
          if (err) return done(err);
          if (author)
            return done(
              null,
              false,
              req.flash("signup message", "This email is already taken")
            );
          const newAuthor = new Author({
            name: req.body.name,
            email,
            password,
          });
          await newAuthor.save();
          return done(null, newAuthor); // Corrected here to return the new author
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        Author.findOne({ email }, async (err, author) => {
          if (err) return done(err);
          if (!author)
            return done(
              null,
              false,
              req.flash("login message", "No user found")
            );
          author.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch)
              return done(
                null,
                false,
                req.flash("login message", "Email and password do not match")
              );
            return done(null, author);
          });
        });
      }
    )
  );
};
