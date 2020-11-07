import { App } from './config/app';

let application = new App();
let app = application.get_app();
let io = application.get_io();
let server = application.get_server();

export { app, io, server };

