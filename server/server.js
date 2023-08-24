import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import expressSession from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//These can generated from their induvidual development website
const GOOGLE_CLIENT_ID =
  "82289887000-gnpkkifn3kh0vkreuci8kdl7o3lkv72s.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const FACEBOOK_CLIENT_ID = "655622049624173";
const FACEBOOK_CLIENT_SECRET = "767073590f09a7f6b457eec745bef4cd";

//  Google Login
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/google",
    },
    (accessToken, refreshToken, profile, callback) => {
      callback(null, profile);
    }
  )
);

//Facebook login
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/facebook",
      profileFields: ["emails", "displayName", "name", "picture"],
    },
    (accessToken, refreshToken, profile, callback) => {
      callback(null, profile);
    }
  )
);

// serialize and deserealize the user .... do not know what it is doing though
passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});

app.use(
  expressSession({
    secret: "oAuthCGT",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

//routes
app.get("/login/success",(req,res)=>{
  if(req.user){
    res.status(200).json({
      success:true,
      message:"successfull",
      user:req.user
    })
  }

})

app.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile email"] })
);

app.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get("/google", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

app.get("/facebook", passport.authenticate("facebook"), (req, res) => {
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.send(
    req.user ? req.user : "Not logged in, login with Google or Facebook"
  );
});

app.listen(3000);
