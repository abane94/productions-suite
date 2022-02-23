import { Injectable } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Material } from 'src/types/models/materials.types';
import { DataModule } from '../data.module';
import { GenericDataService } from '../base-classes/generic-data-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MaterialService extends GenericDataService<Material> {

  public url = 'api/materials/';

  constructor(protected http: HttpClient) {
    super(http);
  }

  async getMaterialClasses() {
    const result = await this.get().toPromise();
    const classList = result.items.map(m => m['class'] as string);
    return classList.filter((c, i, self) => self.indexOf(c) === i)
  }
}
