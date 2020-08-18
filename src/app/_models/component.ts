import { Photo } from './photo';

export interface Components {
    id: number;
    mnf: string;
    type: string;
    size: string;
    nominal: string;
    created: Date;
    photoUrl: string;
    photos?: Photo[];
}
