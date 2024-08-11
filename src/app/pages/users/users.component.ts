import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';

import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { PaginatorService } from '../../services/paginator.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule , RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {

  $users: PaginatorService

  constructor(usersService: UsersService, paginatorService: PaginatorService) {

    this.$users = paginatorService.of(usersService);

  }
}
