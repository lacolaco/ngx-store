import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CounterStore, initialState } from './state/counter-store';
import { Store } from '@lacolaco/ngx-store';

describe('AppComponent', () => {
  let counterStore: CounterStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CounterStore,
          useValue: new Store({ initialState }),
        },
      ],
      declarations: [AppComponent],
    });

    counterStore = TestBed.get(CounterStore);
  });
});
