
// export interface Material {
//     id: number;
//     name: string;
//     description: string;
//     category: {display: string, value: string};
//     baseCost: number;
//     class: string;
//     supplier: string;
//     supplierItemUrl: string;
//     options: {
//       items: {
//         name: string;
//         selections: {
//           items: {
//             value: string;
//             display: string;
//             img: string;
//             priceAdjustment: number
//           }[]
//         }
//       }[]
//     }
//   }

import { Id, NoId } from "../util/util";

interface VariationLevel {
  [ variationOptions: string ]: {
      price: number;
  } | VariationLevel;
}

export interface MaterialListing_Id<T> {
  id: T;
  name: string;
  description: string;
  category: {display: string, value: string};
  class: string;
  supplier: string;
  supplierItemUrl: string;
  priceMap: VariationLevel;  // this could also be flat, each combination of variations gets its own record, and similar records would be loaded for changing/selecting the options in the UI
}

export type MaterialListing_ = NoId<MaterialListing_Id<never>>;
export type MaterialListing = MaterialListing_Id<Id>




export interface Material_Id<T> {
  id: T;
  listing: MaterialListing['id'];
  name: string;
  price: number;
  quantity: number | null;
  variation: string[]
}

export type Material_ = NoId<Material_Id<never>>;
export type Material = Material_Id<Id>;

export default Material;
