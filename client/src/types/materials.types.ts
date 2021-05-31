
export interface Material {
    id: number;
    name: string;
    description: string;
    category: {display: string, value: string};
    baseCost: number;
    class: string;
    supplier: string;
    supplierItemUrl: string;
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
