# No Longer Maintained. Use [@lacolaco/reactive-store](https://github.com/lacolaco/reactive-store) Instead.

# @lacolaco/ngx-store

Minimal state management library for Angular based on RxJS.

https://yarn.pm/@lacolaco/ngx-store

[![@lacolaco/ngx-store Dev Token](https://badge.devtoken.rocks/@lacolaco/ngx-store)](https://devtoken.rocks/package/@lacolaco/ngx-store)

[![CircleCI](https://circleci.com/gh/lacolaco/ngx-store.svg?style=svg)](https://circleci.com/gh/lacolaco/ngx-store)

[![npm version](https://badge.fury.io/js/%40lacolaco%2Fngx-store.svg)](https://badge.fury.io/js/%40lacolaco%2Fngx-store)

## Install

```
$ yarn add @lacolaco/ngx-store
```

## How to Use

### Create a store

A "store" is an Angular service which hold its state.

1. Define a class which extends `Store<T>`.
2. Pass the initial state to `super({ initialState })`;
3. Decorate the class with `@Injectable()` as well as other usual Angular services.

```ts
import { Injectable } from '@angular/core';
import { Store } from '@lacolaco/ngx-store';

export interface State {
  count: number;
}

export const initialState: State = {
  count: 0,
};

// Also you can use your NgModule's `providers` array to provide this service.
@Injectable({ providedIn: 'root' })
export class CounterStore extends Store<State> {
  constructor() {
    super({ initialState });
  }
}
```

### Use the store

1. Inject your store.
2. Select specific value from the store with `selectValue`.

```ts
@Component({
  selector: 'app-root',
  template: `
    <p>Counter: {{ count$ | async }}</p>
  `,
})
export class AppComponent implements OnInit {
  constructor(private counterStore: CounterStore) {}
}
```

#### `selectValue((state: T) => U): Observable<U>` : Observe selected state change

`selectValue` method is for mapping and memoize. Internally it uses RxJS's `map` and `distinctUntilChanged` operators.

```ts
@Component({
  selector: 'app-root',
  template: `
    <p>Counter: {{ count$ | async }}</p>
  `,
})
export class AppComponent implements OnInit {
  count$: Observable<number>;

  constructor(private counterStore: CounterStore) {
    this.count$ = this.counterStore.selectValue(state => state.count);
  }
}
```

#### `valueChanges: Observable<T>`: Observe whole state changes

`valueChanges` is a _raw_ observable of the store.

```ts
@Component({
  selector: 'app-root',
  template: `
    <p>Counter: {{ count$ | async }}</p>
  `,
})
export class AppComponent implements OnInit {
  count$: Observable<number>;

  constructor(private counterStore: CounterStore) {
    // same to `selectValue`
    this.count$ = this.counterStore.valueChanges.pipe(
      map(state => state.count),
      distinctUntilChanged(),
    );
  }
}
```

#### `updateValue((state: T) => T) void`: Update the store with new state

`updateValue` takes a function which takes the current state and returns a new state.

```ts
@Component({
  selector: 'app-root',
  template: `
    <p>Counter: {{ count$ | async }}</p>
  `,
})
export class AppComponent implements OnInit {
  count$: Observable<number>;

  constructor(private counterStore: CounterStore) {
    this.count$ = this.counterStore.selectValue(state => state.count);
  }

  ngOnInit() {
    setInterval(() => {
      this.counterStore.updateValue(state => ({ count: state.count }));
    }, 1000);
  }
}
```

### Store Options

#### Listen onChange event

A store dispatchs an event when its state has been updated.

```ts
@Injectable({ providedIn: 'root' })
export class CounterStore extends Store<State> {
  constructor() {
    super({
      initialState,
      onUpdate: change => {
        console.log(`Previous Value`, change.previousValue);
        console.log(`Current Value`, change.currentValue);
        console.log(`Action Name`, change.actionName);
      },
    });
  }
}
```

**actionName** is the name of the function passed to `updateValue`.
If you pass an anonymous function, `change.actionName` is empty.
Named function is helpful for better logging or other purposes.

```ts
// Named function
const incrementOne = (state: CounterState) => ({
  count: state.count + 1,
});

@Component({
  selector: 'app-root',
  template: `
    <p>Counter: {{ count$ | async }}</p>
  `,
})
export class AppComponent implements OnInit {
  count$: Observable<number>;

  constructor(private counterStore: CounterStore) {
    this.count$ = this.counterStore.selectValue(state => state.count);
  }

  ngOnInit() {
    setInterval(() => {
      this.counterStore.updateValue(incrementOne);
    }, 1000);
  }
}
```

---

### License

MIT

### Author

Suguru Inatomi a.k.a. lacolaco

Patreon: https://www.patreon.com/lacolaco
