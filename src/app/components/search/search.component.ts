import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchField = new FormControl('');

  user?: User;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.searchField.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      tap((id) => { id == "" ? this.user = undefined : null }),
      filter((id) => !!id),
      switchMap(id => this.userService.show(id))
    ).subscribe((user?: User) => {

      this.user = user;
    })
  }

  clear() {
    this.searchField.setValue('');
    this.user = undefined;

  }
}
