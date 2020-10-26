import { Photo } from './photo';
import { history } from './history';
import { Reels } from './Reels';

export interface Components {
    id: number;
    mnf: string;
    manufacturer: string;
    detdescription: string;
    buhNr: string;
    size: string;
    type: string;
    nominal: string;
    furl: string;
    durl: string;
    murl: string;
    photoUrl: string;
    created: Date;
    photos?: Photo[];
    history?: history[];
    reels?: Reels[];
}
