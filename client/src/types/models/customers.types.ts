export interface Customer {
    id: number;
    name: string;
    description: string;

    contact: CustomerContact;  // this would be on the client side model, they would be stored in seperate tables
}


export interface CustomerContact {  // this will still have its own service, with constraints
    id: number;
    customerId: number;
    name: string;
    description: string;
    email: string;
    primaryPhone: string;
    mobile: string;
    ext: string;
}
