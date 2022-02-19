import {Observable, of, Subscription} from "rxjs";
import {BehaviorSubject} from "rxjs";
import { applyContext, applySingleContext, ListContext } from "src/types/context.types";
import { ID, NoId } from "src/types/util/util";
import { GenericDataService } from "./generic-data-service-2";
import { IGenericData, ListResult } from "./generic-data.type";


export abstract class GenericStore<T extends ID, G = Partial<T>> implements IGenericData<ID, G> {

    private _items: BehaviorSubject<ListResult<T>> = new BehaviorSubject({items: [], total: 0});
    private bust = true;

    constructor(protected dataService: IGenericData<T, G>) {
        this.reload();
    }

    private maybeReload() {
        if (this.bust) {
            return this.reload();
        }
    }

    private reload()  {
        const obs = this.dataService.get({})
            .subscribe({
                next: x => this._items.next(x),
                error: err => console.error('Observer got an error: ' + err),
                complete: () => obs.unsubscribe(),
            });
        return obs;
    }

    get items() {
        return this._items.asObservable();
    }

    get(context?: ListContext<T>): Observable<ListResult<T>> {
        if (context) {
            const result = applyContext(this._items.value.items, context);
            return of(result);
        } else {
            return of(this._items.value);
        }

    }

    getOne(context: ID | Partial<T>): Observable<T> {
        let ret: T;
        if ((context as ID).id) {
            ret = this._items.value.items.find(item => item.id === (context as ID).id);
        } else {
            ret = applySingleContext(this._items.value.items, (context as Partial<T>));
        }

        // TODO: could refresh the list if not found, but then there could be side effects from launching a new next call
        return of(ret);
    }

    add(item: T): Observable<T> {

        let obs = this.dataService.add(item);
        this.reload();

        return obs;
    }

    update(item: Partial<T> & ID): Observable<T> {

        let obs = this.dataService.update(item);
        this.reload();

        return obs;
    }


    delete(deleted: T): Observable<T> {
        let obs = this.dataService.delete(deleted);
        this.reload();

        return obs;
    }
}
