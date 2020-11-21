import { Request, Response } from 'express';
import { DataAll, MeleeGame, MeleeGameFormat, MeleeGameType, MeleeCharacter, MeleeStage } from '../modules/common/model';
import { success_response, failure_response } from '../modules/common/service';

export class DataController
{
    public get_data_all(req: Request, res: Response)
    {
        try
        {
            success_response('get_data_all_success', this.data_all, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    private get data_all(): DataAll
    {
        return {
            stages: this.stages,
            games: this.games,
            characters: this.characters
        };
    }

    private get games(): MeleeGame[]
    {
        return [
            {
                _id: "quickplay_singles",
                format: MeleeGameFormat.SINGLES,
                type: MeleeGameType.QUICKPLAY,
                disabled: false
            },
            {
                _id: "custom_singles",
                format: MeleeGameFormat.SINGLES,
                type: MeleeGameType.CUSTOM,
                disabled: false
            },
            {
                _id: "ranked_singles",
                format: MeleeGameFormat.SINGLES,
                type: MeleeGameType.RANKED,
                disabled: false
            },
            {
                _id: "quickplay_doubles",
                format: MeleeGameFormat.DOUBLES,
                type: MeleeGameType.QUICKPLAY,
                disabled: true
            },
            {
                _id: "custom_doubles",
                format: MeleeGameFormat.DOUBLES,
                type: MeleeGameType.CUSTOM,
                disabled: true
            },
            {
                _id: "ranked_doubles",
                format: MeleeGameFormat.DOUBLES,
                type: MeleeGameType.RANKED,
                disabled: true
            },
        ];
    }

    private get characters(): MeleeCharacter[]
    {
        return [
            {
                _id: "doctor_mario",
                color_count: 5
            },
            {
                _id: "falco",
                color_count: 4
            },
            null,
            {
                _id: "mario",
                color_count: 5
            },
            {
                _id: "fox",
                color_count: 4
            },
            {
                _id: "pichu",
                color_count: 4
            },
            {
                _id: "luigi",
                color_count: 4
            },
            {
                _id: "ness",
                color_count: 4
            },
            {
                _id: "pikachu",
                color_count: 4
            },
            {
                _id: "bowser",
                color_count: 4
            },
            {
                _id: "ice_climbers",
                color_count: 4
            },
            {
                _id: "jigglypuff",
                color_count: 5
            },
            {
                _id: "peach",
                color_count: 5
            },
            {
                _id: "kirby",
                color_count: 6
            },
            {
                _id: "mewtwo",
                color_count: 4
            },
            {
                _id: "yoshi",
                color_count: 6
            },
            {
                _id: "samus",
                color_count: 5
            },
            {
                _id: "mr_game_and_watch",
                color_count: 4
            },
            {
                _id: "donkey_kong",
                color_count: 5
            },
            {
                _id: "zelda",
                color_count: 5
            },
            {
                _id: "marth",
                color_count: 5
            },
            {
                _id: "captain_falcon",
                color_count: 6
            },
            {
                _id: "link",
                color_count: 5
            },
            {
                _id: "roy",
                color_count: 5
            },
            {
                _id: "ganondorf",
                color_count: 5
            },
            {
                _id: "young_link",
                color_count: 5
            },
            null
        ];
    }

    private get stages(): MeleeStage[]
    {
        return [
            {
                _id: "icicle_mountain"
            },
            {
                _id: "princess_peachs_castle"
            },
            {
                _id: "kongo_falls"
            },
            {
                _id: "great_bay"
            },
            {
                _id: "yoshis_story",
                singles_neutral: true,
                singles_counterpick: true,
                doubles_neutral: true,
                doubles_counterpick: true
            },
            {
                _id: "fountain_of_dreams",
                singles_neutral: true,
                singles_counterpick: true,
                doubles_neutral: false,
                doubles_counterpick: false
            },
            {
                _id: "corneria"
            },
            {
                _id: "flat_zone"
            },
            {
                _id: "rainbow_cruise"
            },
            {
                _id: "jungle_japes"
            },
            {
                _id: "temple"
            },
            {
                _id: "yoshis_island"
            },
            {
                _id: "green_greens"
            },
            {
                _id: "venom"
            },
            {
                _id: "random"
            },
            {
                _id: "brinstar"
            },
            {
                _id: "onett"
            },
            {
                _id: "fzero_grand_prix"
            },
            {
                _id: "pokemon_stadium",
                singles_neutral: false,
                singles_counterpick: true,
                doubles_neutral: true,
                doubles_counterpick: true
            },
            {
                _id: "mushroom_kingdom"
            },
            {
                _id: "brinstar_depths"
            },
            {
                _id: "fourside"
            },
            {
                _id: "mute_city"
            },
            {
                _id: "poke_floats"
            },
            {
                _id: "mushroom_kingdom_2"
            },
            {
                _id: "battlefield",
                singles_neutral: true,
                singles_counterpick: true,
                doubles_neutral: true,
                doubles_counterpick: true
            },
            {
                _id: "final_destination",
                singles_neutral: true,
                singles_counterpick: true,
                doubles_neutral: true,
                doubles_counterpick: true
            },
            {
                _id: "dreamland",
                singles_neutral: true,
                singles_counterpick: true,
                doubles_neutral: true,
                doubles_counterpick: true
            },
            {
                _id: "super_happy_tree"
            },
            {
                _id: "kongo_jungle"
            }
        ];
    }
}
