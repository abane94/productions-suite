import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/data/services/material.service';
import { GenericListStateService, ListStateService } from 'src/app/data/state/list-state.service';
import { Material } from 'src/types/models/materials.types';

@Injectable()
export class MaterialListStateService extends GenericListStateService<Material> {
  constructor(protected data: MaterialService ) {
    super();
    this.setContext({});
  }
}

@Injectable()
class MaterialPaneComponentState {
  constructor(
    @Inject('Materials') public materials: MaterialListStateService,
    materialService: MaterialService
  ) {
    // materials.setData(materialService);
  }
}

@Component({
  selector: 'app-material-pane',
  templateUrl: './material-pane.component.html',
  styleUrls: ['./material-pane.component.scss'],
  providers: [ MaterialPaneComponentState, MaterialService, {provide: 'Materials', useClass: MaterialListStateService} ]
})
export class MaterialPaneComponent implements OnInit {

  get items() {
    // list just the material, this provides a ~readonly copy, there is no need to track the values after copying them from here
    // return (this.state.materials.value || []).map(e => Object.assign({}, e.value));
    return this.state.materials.value || [];
  }

  constructor(public state: MaterialPaneComponentState) {
    this.state.materials.onNewData
    .subscribe({
      next: () => {
        console.log('new data for pane');
        console.log(this.items);
      },
      error: err => {
        console.warn('Error retrieving data for pane');
        console.warn(err);
      }
    })
    // .toPromise().then((x) => {
    //   console.log(' new data for pane');
    //   console.log(x);
    // })
  }

  ngOnInit(): void {
    console.log(this.state.materials.value);
  }

}
