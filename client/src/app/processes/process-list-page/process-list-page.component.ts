import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DataGridHandlerService } from 'src/app/data/data-grid-handler.service';
import { ProcessService } from 'src/app/data/services/process.service';
import { ListStateService } from 'src/app/data/state/list-state.service';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';
import { Process } from 'src/types/models/processes.types';
import ProcessFormDefinition from '../process-form-definition';

@Injectable()
class ProcessListPageState {
  constructor(
    @Inject('Process') public process: ListStateService<Process>,
    processService: ProcessService
  ) {
    process.setData(processService);
  }
}

@Component({
  selector: 'app-process-list-page',
  templateUrl: './process-list-page.component.html',
  styleUrls: ['./process-list-page.component.scss'],
  providers: [ ProcessListPageState, ProcessService, {provide: 'Process', useClass: ListStateService} ]
})
export class ProcessListPageComponent implements OnInit {
  addModalIsOpen = false;
  nestedDisplayField: NestedDisplayFields = {
    ProcessOptions: {
      field: 'name',
      nested: {
        SelectionsInnerForm: {
          field: 'display'
        }
      }
    }
  };

  formDef: FormDefinition = ProcessFormDefinition([], []);
  process: Process[] = [];

  selected!: Process[];
  constructor(
    // private processService: ProcessService,
    public state: ProcessListPageState,
    public gridHandler: DataGridHandlerService<Process>
  ) {
    // gridHandler.setService(processService);
    // gridHandler.onItems$.subscribe(process => this.process = process );
    // this.processService.get().then(result => this.process = result.items);
    gridHandler.setState(state.process);
  }


  ngOnInit(): void {
  }

  async addProcess(process: Process) {
    // this.addModalIsOpen = false;
    // await this.processService.add(process);
    // this.process = (await this.processService.get()).items;
    this.state.process.add(process).save();
  }

}


