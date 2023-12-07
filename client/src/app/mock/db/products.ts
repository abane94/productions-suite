import { Resource } from 'src/types/util/util';
import { Product } from '../../../types/models/product.types';


const products: Product[] = [{  // TODO: remove Partial
    id: 0,
    name: 'Screen printed t hsirts',
    description: 'A good way to order bluk custom tshirts',
    baseHours: 1,
    useQuantity: true,
    quantity: {
        hoursPerUnit: .25,
    },  // if the quantity of the product is null, the product is not allowed to have precesses with a null quantity
    minComplexity: 20,
    maxComplexity: 80,
    materials: [],  // materials that are explicity included with the Product, but not tied to a process
    processes: [1], //Process['id'];
    materialStubs: [{
        title: "Shirt",
        resource: Resource.Material,
        multiple: false,
        // category: Category,
        // class: string,
      }],
    // processStubs?: ResourceStub<Resource.Material>[];  //? include??
}

];
export default products;
