import { Component } from '@angular/core';
import { Store } from '@lacolaco/reactive-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <p>Counter: {{ count$ | async }}</p>
  `,
})
export class AppComponent {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = this.store.select(state => state.count);
  }

  ngOnInit() {
    setInterval(() => {
      this.store.patch(state => ({ count: (state.count || 0) + 1 }));
    }, 1000);
  }
}
