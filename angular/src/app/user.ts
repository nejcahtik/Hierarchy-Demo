import { Level } from "./level";

export interface User {
    id: number;
    name: string;
    surname: string;
    mentor_name: string;
    mentor_surname: string;
    mentor_id: number;
    date_of_mentorship: Date;
    personal_points: number;
    networking_points: number;
    total_points: number;
    paid_points: number;
    cash: number;
    paid_cash: number;
    level: Level;
    emso: number;
    municipality: string;
    geolocation: string;
    trr: string;
    bank: string;
    employment_contract_date: Date;
}
