import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { filter, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

   user?: User;

  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      filter((params) => params.has('id')),
      switchMap(params => this.usersService.show(params.get('id')))
    ).subscribe((user?: User) => {
        
      this.user = user;
    })

  }
}
