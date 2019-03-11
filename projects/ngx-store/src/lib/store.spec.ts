import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { StoreUpdateChange } from './interfaces';
import { Store } from './store';

interface TestState {
  count: number;
}

@Injectable()
class TestStore extends Store<TestState> {
  public lastUpdateChange?: StoreUpdateChange<TestState>;

  constructor() {
    super({
      initialState: { count: 1 },
      onUpdate: change => {
        this.lastUpdateChange = change;
      },
    });
  }
}

describe('Store', () => {
  let store: TestStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestStore],
    });
    store = TestBed.get(TestStore);
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });

  it('should be able to get initial state', () => {
    expect(store.value.count).toEqual(1);
  });

  it('should be able to get updated state', () => {
    store.updateValue(state => ({ count: state.count + 1 }));
    expect(store.value.count).toEqual(2);
  });

  it('should be able to observe value changes', () => {
    const count$ = store.valueChanges;
    store.updateValue(state => ({ count: state.count + 1 }));
    const expected = cold('v', { v: { count: 2 } });
    expect(count$).toBeObservable(expected);
  });

  it('should be able to observe selected value', () => {
    const count$ = store.selectValue(state => state.count);
    store.updateValue(state => ({ count: state.count + 1 }));
    const expected = cold('v', { v: 2 });
    expect(count$).toBeObservable(expected);
  });

  it('should be able to get updated change in onChange hook (anonymous action)', () => {
    store.updateValue(state => ({ count: state.count + 1 }));
    const change = store.lastUpdateChange;
    expect(change).toBeDefined();
    expect(change.previousValue.count).toBe(1);
    expect(change.currentValue.count).toBe(2);
    expect(change.actionName).toBe('');
  });

  it('should be able to get updated change in onChange hook (named action)', () => {
    const increment = state => ({ count: state.count + 1 });
    store.updateValue(increment);
    const change = store.lastUpdateChange;
    expect(change).toBeDefined();
    expect(change.previousValue.count).toBe(1);
    expect(change.currentValue.count).toBe(2);
    expect(change.actionName).toBe('increment');
  });
});
