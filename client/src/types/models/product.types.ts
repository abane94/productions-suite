import { Categorizable, Id, NoId, Resource, ResourceStub } from "../util/util";
import { Material_Id } from "./materials.types";


export interface Product_Id<T> extends Partial<Categorizable> {  // TODO: remove Partial
    id: T;
    name: string;
    description: string;
    baseHours: number;
    quantity: {
        hoursPerUnit: number;
    } | null;  // if the quantity of the product is null, the product is not allowed to have precesses with a null quantity
    minComplexity: number;
    maxComplexity: number;
    materials: Material_Id<T>[];  // materials that are explicity included with the Product, but not tied to a process
    processes: T; //Process['id'];
    MaterialStubs?: ResourceStub<Resource.Material>[];
    // processStubs?: ResourceStub<Resource.Material>[];  //? include??
}

export type Product_ = NoId<Product_Id<never>>;
export type Product = Product_Id<Id>
