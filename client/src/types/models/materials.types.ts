
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

import { Categorizable, Id, NoId } from "../util/util";

interface VariationLevel {
  [variationOptions: string]: {
    price: number;
  } | VariationLevel;
}

export interface PriceMap {
  columns: string[];
  rows: string[];
  values: object[][];
}

// "cost": 6.6,
// "supplierSku": "B49695500",
// "colorFamily": "Blacks",
// "colorSwatchImage": "Images/ColorSwatch/21695_fm.jpg"


export interface MaterialListing_Id<T> extends Categorizable {
  id: T;
  name: string;
  description: string;
  supplier: string;
  supplierItemUrl: string;
  // title: string;  // different from name, name is the piece nunmber, title is the quick description of the item
  // brand: string;
  // brandImage: string;
  // styleImage: string;
  priceMap?: PriceMap;  // this could also be flat, each combination of variations gets its own record, and similar records would be loaded for changing/selecting the options in the UI

  // TODO: remove once priceMap is in use
  baseCost: number;
  options: {
    items: {
      name: string;
      selections: {
        items: {
          value: string;
          display: string;
          img: string;
          priceAdjustment: number
        }[]
      }
    }[]
  }
}

export type MaterialListing_ = NoId<MaterialListing_Id<never>>;
export type MaterialListing = MaterialListing_Id<Id>
export type Material = MaterialListing_Id<Id>  // remove once the rest of the app knows to use MaterialListing




// export interface Material_Id<T> {
//   id: T;
//   listing: MaterialListing['id'];
//   name: string;
//   price: number;
//   quantity: number | null;
//   variation: string[]
// }

// export type Material_ = NoId<Material_Id<never>>;
// export type Material = Material_Id<Id>;

// export default Material;
