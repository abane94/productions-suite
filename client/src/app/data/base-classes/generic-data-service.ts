import { ClrDatagridStateInterface } from "@clr/angular";


export abstract class GenericDataService<T extends {id: number}> {
    abstract items: T[] = [];

    constructor() { }

    // returns the items with filters/sorting/paging applied, and the total that fit the criteria
    async get(state?: ClrDatagridStateInterface): Promise<{items: T[], total: number}> {
        if (!state) {
            return {items: this.items, total: this.items.length};  // TODO: should probably be some default page size
          }
          let itemList =  this.items;
          if (state.filters) {
            itemList = itemList.filter(m => {
            state.filters.every(f => ('' + m[f.property]).toLocaleLowerCase().indexOf(('' + f.value).toLowerCase()) > -1)
            });
          }
          if (state.sort) {
            itemList = itemList.sort((m1, m2) => state.sort.reverse ? (m1[state.sort.by.toString()] - m2[state.sort.by.toString()]) : (m2[state.sort.by.toString()] - m1[state.sort.by.toString()]))
          }
          const total = itemList.length;
          if (state.page) {
            itemList = itemList.slice(state.page.from, state.page.to + 1);
          }

          return {items: itemList, total};
    }

    async getOne(id: number) {
        return this.items.find(i => i.id === id);
    }

    async add(item: T) {
        if (item.id) {
            console.error('Adding item that already has ID');
        } else {
            item.id = this.items.length;
            this.items.push(item);
        }
    }

    async update(item: T) {
      const idx = this.items.findIndex(i => i.id === item.id);
      this.items[idx] = item;
    }
}
