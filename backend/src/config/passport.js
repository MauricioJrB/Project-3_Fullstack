import passport from 'passport';
import passportJwt from 'passport-jwt';
import UserController from '../controllers/User.js';

const { SECRET } = process.env;

const { Strategy, ExtractJwt } = passportJwt;

const passportConfig = () => {
  const params = {
    secretOrKey: SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  const strategy = new Strategy(params, (payload, done) => {
    UserController.getUserById(payload.id)
      .then(user => {
        if (user) done(null, { ...payload });
        else done(null, false);
      })
      .catch(err => done(err, false));
  });
  passport.use(strategy);
  return passport.authenticate('jwt', { session: false });
};

export default passportConfig;
