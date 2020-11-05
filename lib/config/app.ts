import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from 'mongoose';
import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import { UserRoutes } from "../routes/user_routes";
import { LobbyRoutes } from "../routes/lobby_routes";
import { GameRoutes } from "../routes/game_routes";
import { CommonRoutes } from "../routes/common_routes";
import * as env from '../../env-variables.json';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';

export class App
{
    PORT = 3000;
    public app: express.Application;
    public io: SocketIO.Server;
    public server: Server;
    public mongoUrl: String = env.mongoUrl;
    private user_routes: UserRoutes = new UserRoutes();
    private lobby_routes: LobbyRoutes = new LobbyRoutes();
    private game_routes: GameRoutes = new GameRoutes();
    private common_routes: CommonRoutes = new CommonRoutes();

    constructor()
    {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.user_routes.route(this.app);
        this.game_routes.route(this.app);
        this.lobby_routes.route(this.app);
        this.common_routes.route(this.app);
        this.createServer();
        this.listen();
    }

    private config()
    {
        // support cross origin resource sharing
        this.app.use(cors());
        // create socket server here
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

    private createServer()
    {
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private mongoSetup()
    {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }

    private listen()
    {
        this.server.listen(this.PORT, () =>
        {
            console.log("Server listening on port " + this.PORT);
        });

        this.io.on("connect", (socket: any) =>
        {
            console.log("Connected client on port " + this.PORT);

            // add socket listeners here

            socket.on("disconnect", () =>
            {
                console.log("Client disconnected");
            });
        });
    }

    public getApp(): express.Application
    {
        return this.app;
    }

    public getIo(): SocketIO.Server
    {
        return this.io;
    }

    public getServer(): Server
    {
        return this.server;
    }
}
