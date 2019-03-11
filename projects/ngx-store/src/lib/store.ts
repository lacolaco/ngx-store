import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { StoreOnUpdateFn, StoreOptions, StoreUpdateFn } from './interfaces';

export const noopStoreOnUpdate: StoreOnUpdateFn<any> = () => {};

export class Store<T> {
  private readonly innerSubject: BehaviorSubject<T>;
  private readonly onUpdate: StoreOnUpdateFn<T>;
  private readonly storeName: string;

  get valueChanges(): Observable<T> {
    return this.innerSubject.asObservable();
  }

  get value(): T {
    return this.innerSubject.getValue();
  }

  constructor(options: StoreOptions<T>) {
    this.innerSubject = new BehaviorSubject(options.initialState);
    this.onUpdate = options.onUpdate || noopStoreOnUpdate;
    this.storeName = options.storeName || '';
  }

  updateValue(updateFn: StoreUpdateFn<T>) {
    const actionName = updateFn.name || '';
    const currentValue = this.innerSubject.getValue();
    const newValue = updateFn(currentValue);
    this.innerSubject.next(newValue);
    this.onUpdate({
      previousValue: currentValue,
      currentValue: newValue,
      actionName: actionName,
      storeName: this.storeName,
    });
  }

  selectValue<V>(selectFn: (state: T) => V): Observable<V> {
    return this.innerSubject.pipe(
      map(selectFn),
      distinctUntilChanged(),
    );
  }
}
