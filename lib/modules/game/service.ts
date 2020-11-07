import { IGame } from './model';
import game from './schema';

export default class GameService
{
    public filter_game(query: any): Promise<IGame>
    {
        return game.findOne(query);
    }

    public all_games(): Promise<IGame[]>
    {
        return game.find();
    }
}
