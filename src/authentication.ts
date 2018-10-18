import { Response, Request }          from "express";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { User }          from "./entity/User";
import { getRepository } from "typeorm";

import GoogleUserSignUpService from "./services/GoogleUserSignUpService";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const initPassportStrategies = (passport: any) => {

  passport.serializeUser(function (user: any, done: any) {
    return done(undefined, user.username);
  });

  passport.deserializeUser(function (user: any, done: any) {

    return done(undefined, user.username);
  });

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: process.env.SECRET_KEY
  };

  passport.use(new JwtStrategy(jwtOptions, async function (jwtPayload, done) {
    try {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne(jwtPayload.id);
      done(undefined, user);
    } catch (error) {
      done(error);
    }
  }));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/google/callback"
  },
    async function (accessToken: any, refreshToken: any, googleProfile: any, done: Function) {
      try {
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({ googleId: googleProfile.id });
        if (user) {
          done(undefined, user);
        } else {
          const googleUserSignUpService = new GoogleUserSignUpService(googleProfile);
          const newUser = await googleUserSignUpService.signUp();
          done(undefined, newUser);
        }
      } catch (error) {
          done(error);
      }
    }
  ));
};

export default initPassportStrategies;