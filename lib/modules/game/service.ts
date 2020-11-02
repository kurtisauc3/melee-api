import { IGame } from './model';
import game from './schema';

export default class GameService
{
    public getGameMode(query: any, callback: any) {
        game.findOne(query, callback);
    }

    public getGameModes(query: any, callback: any) {
        game.find(query, callback);
    }
}
