import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterStore, actions } from './state/counter-store';

const incrementOne = actions.increment(1);

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
