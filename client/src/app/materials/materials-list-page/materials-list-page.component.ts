import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/data/material.service';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
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
  materials: any[] = [];

  selected!: any[];
  constructor(private materialService: MaterialService) {
    this.materialService.getMaterials().then(materials => this.materials = materials);
  }

  onSave($event: any) {
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
    await this.materialService.addMaterial(material);
    this.materials = await this.materialService.getMaterials();
  }

}
