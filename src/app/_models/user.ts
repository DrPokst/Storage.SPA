import { Photo } from './photo';
import { Reels } from './Reels';

export interface User {
    id: number;
    userName: string;
    photoUrl: string;
    created: Date;
    email: string;
    lasActive: Date;
    userPhoto?: Photo[];
    roles?: string[];
    history?: History[];
    reels?: Reels[];
}