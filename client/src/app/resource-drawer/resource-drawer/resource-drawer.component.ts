import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/data/services/material.service';
import { ProcessService } from 'src/app/data/services/process.service';
import { GenericListStateService, ListStateService } from 'src/app/data/state/list-state.service';
import { Material } from 'src/types/models/materials.types';
import { Process } from 'src/types/models/processes.types';
import { ResourceDrawerService } from '../resource-drawer.service';

// TODO: move specific list state implementations to common location
@Injectable()
export class MaterialListStateService extends GenericListStateService<Material> {
  constructor(protected override data: MaterialService ) {
    super();
    this.setContext({});
  }
}
@Injectable()
export class ProcessListStateService extends GenericListStateService<Process> {
  constructor(protected override data: ProcessService ) {
    super();
    this.setContext({});
  }
}

@Injectable()
class ResourceDrawerComponentState {
  constructor(
    @Inject('Materials') public materials: MaterialListStateService,
    materialService: MaterialService,
    @Inject('Processes') public processes: ProcessListStateService,
    processService: ProcessService
  ) { }
}

@Component({
  selector: 'app-resource-drawer',
  templateUrl: './resource-drawer.component.html',
  styleUrls: ['./resource-drawer.component.scss'],
  providers: [
    ResourceDrawerComponentState,
    MaterialService,
    {provide: 'Materials', useClass: MaterialListStateService},
    {provide: 'Processes', useClass: ProcessListStateService}
  ]
})
export class ResourceDrawerComponent implements OnInit {

  get materials() {
    // list just the material, this provides a ~readonly copy, there is no need to track the values after copying them from here
    // return (this.state.materials.value || []).map(e => Object.assign({}, e.value));
    return this.state.materials.value || [];
  }
  get processes() {
    return this.state.processes.value || [];
  }

  constructor(public state: ResourceDrawerComponentState, public service: ResourceDrawerService) {
    this.state.materials.onNewData
    .subscribe({
      next: () => {
        // console.log('new data for pane');
        console.log(this.materials);
      },
      error: err => {
        // console.warn('Error retrieving data for pane');
        console.warn(err);
      }
    });
    // .toPromise().then((x) => {
    //   console.log(' new data for pane');
    //   console.log(x);
    // })
  }

  ngOnInit(): void {
    console.log(this.state.materials.value);
  }

}
