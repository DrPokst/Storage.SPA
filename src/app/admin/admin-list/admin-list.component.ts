import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ReelService } from 'src/app/_services/reel.service';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  model: any = {};
  users: User[];
  bsModalRef: BsModalRef;
  isrinkta: any[];

  constructor(private reelService: ReelService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  turnOnAll()
  {
    this.reelService.TurnOnAll().subscribe(() => {
      this.alertify.success('sekmingai ijungti visi');
    }, error => {
      this.alertify.error(error);
    });
  }
  turnOffAll()
  {
    this.reelService.TurnOffAll().subscribe(() => {
      this.alertify.success('sekmingai isungti visi');
    }, error => {
      this.alertify.error(error);
    });
  }
  loadUsers()
  {
    this.authService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }

  ChangeRole(username: string){
    
    this.authService.changeRole(username, this.model).subscribe(() => {
      this.alertify.success('sekmingai pakeista');
      this.ngOnInit();
    }, error => {
      this.alertify.error(error);
    });
  }

  editRolesModal(user: User){
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      console.log(values);
      this.isrinkta = values.filter(function(value){
        return value.checked === true;
      });
      const rolesToUpdate = {
        roleNames: [...this.isrinkta.map(el => el.name)]
      };
      if(rolesToUpdate){
        this.authService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          console.log(error);
        });
      }
    });


  }

  private getRolesArray(user){
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'VIP', value: 'VIP'},
    ];

    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j <  userRoles.length; j++) {
        if (availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }

    }
    return roles;
  }

}
