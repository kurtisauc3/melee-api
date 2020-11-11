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
import * as url from 'url';

export class App
{
    PORT = 3000;
    public app: express.Application;
    public io: SocketIO.Server;
    public server: Server;
    private user_routes: UserRoutes = new UserRoutes();
    private lobby_routes: LobbyRoutes = new LobbyRoutes();
    private game_routes: GameRoutes = new GameRoutes();
    private common_routes: CommonRoutes = new CommonRoutes();

    constructor()
    {
        this.app = express();
        this.config();
        this.mongo_setup();
        this.user_routes.route(this.app);
        this.game_routes.route(this.app);
        this.lobby_routes.route(this.app);
        this.common_routes.route(this.app);
        this.create_server();
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
        if (!env.bypassAuthentication) {
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
    }

    private create_server()
    {
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
        this.io.engine.generateId = (req) => url.parse(req.url,true).query?.user_id?.toString();
    }

    private mongo_setup()
    {
        mongoose.connect(env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
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

    public get_app(): express.Application
    {
        return this.app;
    }

    public get_io(): SocketIO.Server
    {
        return this.io;
    }

    public get_server(): Server
    {
        return this.server;
    }
}
