import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  history: History[];
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserHisotry();
  }

  getUserHisotry() {
    this.authService.getUserInfo(this.authService.decodedToken.unique_name).subscribe((user: User) => {
      this.history = user.history;

    }, error => {
      console.log(error);
    });
  }
}
