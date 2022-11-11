import { NoId, Id, ResourceStub, Resource, Categorizable } from "../util/util";
import { Material } from "./materials.types"

interface Process_Id<T> extends Partial<Categorizable> { // TODO: Remove partial
    id: T;
    name: string;
    description: string;
    // quantity: number | null; // when null refers to a quantity, it means, that the quantity comes from the product. UPDATE: Null is hard to combine with a number input, I think 0(?) or negative would do the trick
    useParentQuantity: boolean;
    // time: {
    //     applyToQuantity: boolean;  // this could be the processes quantity, or if null, its the products quantity
    //     value: number;
    // },
    hours: number;
    applyTimeToQuantity: boolean;
    // cost: {
    //     applyToQuantity: boolean;
    //     value: number;
    //     tiers: {min: number, price: number}[] ;  // this is only valid if applyToQuantity is true
    // },
    price: number;
    applyPriceToQuantity: boolean;
    priceTiers?: {min: number, price: number}[];
    materials?: Material[];
    stubs?: ResourceStub<Resource.Material>[];
}

export type Process_ = NoId<Process_Id<never>>;
export type Process = Process_Id<Id>;
