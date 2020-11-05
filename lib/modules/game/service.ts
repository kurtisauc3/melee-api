import { IGame } from './model';
import game from './schema';

export default class GameService
{
    public filterGame(query: any): Promise<IGame>
    {
        return game.findOne(query);
    }

    public allGames(): Promise<IGame[]>
    {
        return game.find();
    }
}
