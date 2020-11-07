import { GameFormat, GameType } from "../common/model";

export interface IGame {
    _id?: String;
    format: GameFormat;
    type: GameType;
}
