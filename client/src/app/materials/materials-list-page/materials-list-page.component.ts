import { Component, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DataGridHandlerService } from 'src/app/data/data-grid-handler.service';
import { MaterialService } from 'src/app/data/material.service';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { Material } from 'src/types/materials.types';
import MaterialFormDefinition from '../material-form-definition';

@Component({
  selector: 'app-materials-list-page',
  templateUrl: './materials-list-page.component.html',
  styleUrls: ['./materials-list-page.component.scss']
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
  constructor(private materialService: MaterialService, public gridHandler: DataGridHandlerService<Material>) {
    gridHandler.setService(materialService);
    gridHandler.onItems$.subscribe(materials => this.materials = materials );
    this.materialService.get().then(result => this.materials = result.items);
  }

  onSave($event: Material) {
    console.log('Saved!');
    console.log($event);

    let idx = -1;
    for (let i = 0; i < this.materials.length; i++) {
      const material = this.materials[i];
      if (material.name === $event.name) {
        idx = i;
        break;
      }
    }

    if (idx > -1) {
      // this.materials[idx] = $event;  // TODO: fix angular error when saving, maybe needs the trackby function in ngFor
    }
  }

  ngOnInit(): void {
  }

  async addMaterial(material) {
    this.addModalIsOpen = false;
    await this.materialService.add(material);
    this.materials = (await this.materialService.get()).items;
  }

}
