import { Photo } from './photo';

export interface Reels {
    id: number;
    cMnf: string;
    qty: string;
    photoUrl2: string;
    photos?: Photo[];
}