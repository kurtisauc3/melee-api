import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
//import * as mongoose from 'mongoose';
import { GameRoutes } from "../routes/game_routes";
import { UserRoutes } from "../routes/user_routes";
import { CommonRoutes } from "../routes/common_routes";
import environment from "../environment";

class App {

   public app: express.Application;
   //public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

   private game_routes: GameRoutes = new GameRoutes();
   private user_routes: UserRoutes = new UserRoutes();
   private common_routes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      // this.mongoSetup();
      this.game_routes.route(this.app);
      this.user_routes.route(this.app);
      this.common_routes.route(this.app);
   }

   private config(): void {
        // support cross origin resource sharing
        this.app.use(cors());
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   // private mongoSetup(): void {
   //    mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   // }

}
export default new App().app;
