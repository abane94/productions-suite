import {Observable, of} from "rxjs";
import {BehaviorSubject} from "rxjs";
import { GenericDataService } from "./generic-data-service-2";

interface IdContext {
    id: number | string;
}


export abstract class GenericStore<T extends {id: number}> {

    private _items: BehaviorSubject<T[]> = new BehaviorSubject([]);
    private context: any;

    constructor(protected dataService: GenericDataService<T>) {
        this.loadInitialData();
    }

    get items() {
        return this._items.asObservable();
    }

    loadInitialData() {
        this.dataService.get()
            .subscribe(
                res => {
                    this._items.next(res.items);
                },
                err => console.log("Error retrieving Items")
            );
    }

    getOne(id: number) {
        const ret = this._items.value.find(item => item.id === id);
        // TODO: could refresh the list if not found, but then there could be side effects from launching a new next call
        return of(ret);
    }

    add(item: T): Observable<T> {

        let obs = this.dataService.add(item);

        obs.subscribe(
                res => {
                    this._items.getValue().push(item);
                    this._items.next(this._items.getValue());
                });

        return obs;
    }

    // toggleTodo(toggled:Todo): Observable {
    //     let obs: Observable = this.todoBackendService.toggleTodo(toggled);

    //     obs.subscribe(
    //         res => {
    //             let todos = this._todos.getValue();
    //             let index = todos.findIndex((todo: Todo) => todo.id === toggled.id);
    //             let todo:Todo = todos.get(index);
    //             this._todos.next(todos.set(index, new Todo({id:toggled.id, description:toggled.description, completed:!toggled.completed}) ));
    //         }
    //     );

    //     return obs;
    // }


    delete(deleted: T): Observable<T> {
        let obs = this.dataService.delete(deleted);

        obs.subscribe(
                res => {
                    let items: T[] = this._items.getValue();
                    let index = items.findIndex(item => item.id === deleted.id);
                    if (index > -1) {
                        items.splice(index, 1);
                    }
                    this._items.next(items);
                }
            );

        return obs;
    }

    filter(context: any) {  // TODO
        this.context = context;
        let obs = this.dataService.get(context);

        obs.subscribe(
            res => {
                this._items.next(res.items);
            }
        );

        return obs;
    }


}
