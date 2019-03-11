export interface StoreUpdateChange<T> {
  previousValue: T;
  currentValue: T;
  actionName: string;
  storeName: string;
}

export type StoreUpdateFn<T> = (state: T) => T;
export type StoreOnUpdateFn<T> = (change: StoreUpdateChange<T>) => void;
export interface StoreOptions<T> {
  initialState: T;
  storeName?: string;
  onUpdate?: StoreOnUpdateFn<T>;
}
