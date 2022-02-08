import { NoId, Id } from "../util/util";
import Material from "./materials.types";

interface Process_Id<T> {
    id: T;
    title: string;
    description: string;
    quantity: number | null; // when null refers to a quantity, it means, that the quantity comes from the product
    time: {
        applyToQuantity: boolean;  // this could be the processes quantity, or if null, its the products quantity
        value: number;
    },
    cost: {
        applyToQuantity: boolean;
        value: number;
        tiers: {min: number, price: number}[] ;  // this is only valid if applyToQuantity is true
    },
    materials: Material[];
}

export type Process_ = NoId<Process_Id<never>>;
export type Process = Process_Id<Id>;
