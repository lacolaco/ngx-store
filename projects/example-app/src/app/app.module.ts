import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveStoreModule, STORE_MIDDLEWARE } from '@lacolaco/ngx-store';
import { Middleware } from '@lacolaco/reactive-store';

import { AppComponent } from './app.component';

export function loggingMiddleware(next: Middleware) {
  return state => {
    state = next(state);
    console.log(`[State Update]`, state);
    return state;
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveStoreModule.forRoot({
      count: 0,
    }),
  ],
  providers: [
    { provide: STORE_MIDDLEWARE, useValue: loggingMiddleware, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
