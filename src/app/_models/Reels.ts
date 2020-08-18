import { Photo } from './photo2';
import { history } from './history';

export interface Reels {
    id: number;
    cMnf: string;
    qty: number;
    photoUrl2: string;
    location?: string;
    photos?: Photo[];
    history?: history[];
}