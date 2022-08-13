import { Injectable } from '@angular/core';

export type ResourceOptions
  = "Material"
  | "Process"
  // ...

type ResourceToIdMap = {
  [K in ResourceOptions]: string[]
};

@Injectable({
  providedIn: 'root'
})
export class ResourceDrawerService {
  private activeResourceControls: Map<string, ResourceOptions> = new Map();
  private dropsPerResource: ResourceToIdMap = {
    Material: [],
    Process: []
  };

  getDropZones(resource: ResourceOptions) {
    return this.dropsPerResource[resource].join(' ');
  }

  constructor() { }

  requestResourceDropId(resource: ResourceOptions) {
    const guid = this.newGUID();
    this.activeResourceControls[guid] = resource;
    this.dropsPerResource[resource].push(guid);
    return guid;
  }

  destroyResourceDrop(guid: string) {
    // called by controls in their on destroy method
    const resource = this.activeResourceControls.get(guid);
    this.activeResourceControls.delete(guid);
    this.dropsPerResource[resource] = this.dropsPerResource[resource].filter(s => s !== guid);  // TODO: is this concurrent safe?
  }

  // todo: move to util location
  newGUID() {
    // https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
    // return crypto.randomUUID();
  }
}
