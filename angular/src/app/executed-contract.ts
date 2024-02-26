import { Client } from "./client"
import { Product } from "./product"
import { User } from "./user"

export interface ExecutedContract {
    contract_id: number;
    product: Product;
    user: User;
    subordinate: User;
    client: Client
    date_of_payment: Date;
    base_value: number;
    number_of_points: number;
    in_eur: number;
    paid_out: string;
}
