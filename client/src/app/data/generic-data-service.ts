

export abstract class GenericDataService<T extends {id: number}> {
    abstract items: T[] = [];

    constructor() { }

    async get() {
        return this.items;
    }

    async getOne(id: number) {
        return this.items.find(i => i.id = id);
    }

    async add(item: T) {
        if (item.id) {
            console.error('Adding item that already has ID');
        } else {
            item.id = this.items.length;
            this.items.push(item);
        }
    }
}
