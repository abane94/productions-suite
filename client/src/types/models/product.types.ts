import { Id, NoId } from "../util/util";
import { Material_Id } from "./materials.types";


export interface Product_Id<T> {
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
}

export type Product_ = NoId<Product_Id<never>>;
export type Product = Product_Id<Id>


// interface Test_Id<T> {
//     id: T;
//     name: string;
//     age: number;
//   }
// export type Test_ = NoId<Test_Id<never>>  // the trailing underscore indicates that the model is missing the id, useful for add operations
// export type Test = Test_Id<Id>;
