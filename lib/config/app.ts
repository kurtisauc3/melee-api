import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from 'mongoose';
import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import { GameRoutes } from "../routes/game_routes";
import { CommonRoutes } from "../routes/common_routes";
import * as env from '../../env-variables.json';


class App
{
   public app: express.Application;
   public mongoUrl: String = env.mongoUrl;
   private game_routes: GameRoutes = new GameRoutes();
   private common_routes: CommonRoutes = new CommonRoutes();

   constructor()
   {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.game_routes.route(this.app);
      this.common_routes.route(this.app);
   }

   private config()
   {
        // support cross origin resource sharing
        this.app.use(cors());
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // protect all routes
        this.app.use(jwt({
            secret: jwksRsa.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${env.auth0Domain}/.well-known/jwks.json`
            }),
            audience: env.apiIdentifier,
            issuer: `https://${env.auth0Domain}/`,
            algorithms: ['RS256']
        }));
   }

   private mongoSetup()
   {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;
