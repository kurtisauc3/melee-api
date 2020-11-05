import { App } from './config/app';

let application = new App();
let app = application.getApp();
let io = application.getIo();
let server = application.getServer();

export { app, io, server };

