import { Photo } from './photo';

export interface User {
    id: number;
    userName: string;
    created: Date;
    email: string;
    lasActive: Date;
    userPhoto?: Photo[];
    roles: string[];
    
}