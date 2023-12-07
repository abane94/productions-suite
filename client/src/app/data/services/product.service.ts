import { Injectable } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Product } from 'src/types/models/product.types';
import { DataModule } from '../data.module';
import { GenericDataService } from '../base-classes/generic-data-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericDataService<Product> {

  public url = 'api/products';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
