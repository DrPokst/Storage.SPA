import { Photo } from './photo2';
import { history } from './history';
import { Components } from './components'

export interface Reels {
    id: number;
    cMnf: string;
    qty: number;
    photoUrl2: string;
    location?: string;
    photos?: Photo[];
    history?: history[];
    componentas?: Components;
}