import { Component, Injectable, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DataGridHandlerService } from 'src/app/data/data-grid-handler.service';
import { MaterialService } from 'src/app/data/services/material.service';
import { ListStateService } from 'src/app/data/state/list-state.service';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { Material } from 'src/types/models/materials.types';
import MaterialFormDefinition from '../material-form-definition';

// @Injectable({
//   providedIn: MaterialsListPageComponent
// })
@Injectable()
class MaterialListPageState {
  constructor(
    public materials: ListStateService<Material>,
    materialService: MaterialService
  ) {
    materials.setData(materialService);
  }
}

@Component({
  selector: 'app-materials-list-page',
  templateUrl: './materials-list-page.component.html',
  styleUrls: ['./materials-list-page.component.scss'],
  providers: [ MaterialListPageState ]
})
export class MaterialsListPageComponent implements OnInit {
  addModalIsOpen = false;
  nestedDisplayField: NestedDisplayFields = {
    MaterialOptions: {
      field: 'name',
      nested: {
        SelectionsInnerForm: {
          field: 'display'
        }
      }
    }
  };

  formDef: FormDefinition = MaterialFormDefinition([], []);
  materials: Material[] = [];

  selected!: Material[];
  constructor(
    // private materialService: MaterialService,
    public state: MaterialListPageState,
    public gridHandler: DataGridHandlerService<Material>
  ) {
    // gridHandler.setService(materialService);
    // gridHandler.onItems$.subscribe(materials => this.materials = materials );
    // this.materialService.get().then(result => this.materials = result.items);
    gridHandler.setState(state.materials);
  }


  ngOnInit(): void {
  }

  async addMaterial(material) {
    // this.addModalIsOpen = false;
    // await this.materialService.add(material);
    // this.materials = (await this.materialService.get()).items;
    this.state.materials.add(material).save();
  }

}


