import { Injectable } from '@angular/core';
import { Store } from '@lacolaco/ngx-store';

export interface State {
  count: number;
}

export const initialState: State = {
  count: 0,
};

@Injectable({ providedIn: 'root' })
export class CounterStore extends Store<State> {
  constructor() {
    super({
      initialState,
      onUpdate: change => {
        console.log(`Previous`, change.previousValue);
        console.log(`Current`, change.currentValue);
        console.log(`Updater`, change.actionName);
      },
    });
  }
}

const increment = (n: number) => (state: State): State => ({
  count: state.count + n,
});

export const actions = {
  increment,
};
