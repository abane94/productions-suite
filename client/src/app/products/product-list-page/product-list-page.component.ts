import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DataGridHandlerService } from 'src/app/data/data-grid-handler.service';
import { ProductService } from 'src/app/data/services/product.service';
import { ListStateService } from 'src/app/data/state/list-state.service';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { Product } from 'src/types/models/product.types';
import ProductFormDefinition from '../product-form-definition';

@Injectable()
class ProductListPageState {
  constructor(
    @Inject('Product') public product: ListStateService<Product>,
    productService: ProductService
  ) {
    product.setData(productService);
  }
}

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
  providers: [ ProductListPageState, ProductService, {provide: 'Product', useClass: ListStateService} ]
})
export class ProductListPageComponent implements OnInit {
  addModalIsOpen = false;
  nestedDisplayField: NestedDisplayFields = {
    ProductOptions: {
      field: 'name',
      nested: {
        SelectionsInnerForm: {
          field: 'display'
        }
      }
    }
  };

  formDef: FormDefinition = ProductFormDefinition([], []);
  product: Product[] = [];

  selected!: Product[];
  constructor(
    // private productService: ProductService,
    public state: ProductListPageState,
    public gridHandler: DataGridHandlerService<Product>
  ) {
    // gridHandler.setService(productService);
    // gridHandler.onItems$.subscribe(product => this.product = product );
    // this.productService.get().then(result => this.product = result.items);
    gridHandler.setState(state.product);
  }


  ngOnInit(): void {
  }

  async addProduct(product: Product) {
    // this.addModalIsOpen = false;
    // await this.productService.add(product);
    // this.product = (await this.productService.get()).items;
    this.state.product.add(product).save();
  }

}


