import { Component } from '@angular/core';

import { RouterOutlet, RouterLink } from '@angular/router';


import {SearchComponent} from './components/search/search.component';
import { select, Store } from '@ngrx/store';
import { LoadingState , loadingReducer } from './stores/loading/loading.reducer';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SearchComponent , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maids';

  loading$: Observable<boolean>;

  constructor(private store: Store<{loading:{loading:boolean}}>) {
    this.loading$ = this.store.pipe(
      select(state => {

    
        return state.loading.loading;
      })
    );

    // this.loading$.subscribe(console.log)
  }
}
