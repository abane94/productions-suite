import { Injectable } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Process } from 'src/types/models/processes.types';
import { DataModule } from '../data.module';
import { GenericDataService } from '../base-classes/generic-data-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessService extends GenericDataService<Process> {

  public url = 'api/processes';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
