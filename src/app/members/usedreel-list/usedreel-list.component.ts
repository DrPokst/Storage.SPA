import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { CompareService } from 'src/app/_services/compare.service';
import { Reels } from 'src/app/_models/Reels';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { ReelService } from 'src/app/_services/reel.service';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-usedreel-list',
  templateUrl: './usedreel-list.component.html',
  styleUrls: ['./usedreel-list.component.css'],
})
export class UsedreelListComponent implements OnInit {
  reels: Reels[];
  reels2: Observable<Reels[]>;
  jwtHelper = new JwtHelperService();
  suma = 0;
  ilgis = 0;

  model: any = {};
  model2: any = {};
  user: any = {};
  loading = true;
  kint = 0;
  registerForm: FormGroup;

  constructor(private reelService: ReelService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private compareService: CompareService,
              private isLoadingService: IsLoadingService,
              public authService: AuthService) { }


  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    this.loadComparedReels();
    this.GetName();
  }



  loadComparedReels(){
    this.kint++;
    this.compareService.getCompare(this.route.snapshot.params['id']).subscribe((reels: Reels[]) => {
      this.reels = reels;
      if (this.suma === 0) {
        for (let index = 0; index < this.reels.length; index++) {
            const element = this.reels[index];
            this.suma = this.suma + element.qty;
            console.log(this.suma);
        }
      }
      this.ilgis = this.reels.length;
      this.loading = false;
    }, error => {
      this.alertify.error(error);
    });
  }

  Checking(id: any){
    Swal.fire({
      title: 'Ar tikrai norite pasiimti komponentą iš lentynos?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Taip`,
      denyButtonText: `Nusprendžiau, kad nereikia`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.TakeOut(id);
      } else if (result.isDenied) {
      }
    })
  }

  TakeOut(id: any){
    Swal.fire({
      icon: 'info',
      title: 'Pranešimas',
      text: 'Pasiimkite ritę iš lentynos',
      footer: '<a href>Nothing is happening?</a>'
    })
    this.registerForm = new FormGroup(
      {
        ReelId: new FormControl(),
        Username: new FormControl()
      }
    );

    this.registerForm.setValue({ReelId: id,
                                Username: this.authService.decodedToken.unique_name
                                });

    console.log(this.registerForm.value);
    this.reelService.TakeOut(this.registerForm.value).subscribe(() => {
      this.ngOnInit();
      Swal.fire(
        {
        icon: 'success',
        title: 'Ritė išimta',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      this.alertify.error(error);
    });
    console.log(id);

  }
  Checking2(id: any){
    Swal.fire({
      title: 'Ar tikrai norite pasiimti komponentą iš lentynos?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Taip`,
      denyButtonText: `Nusprendžiau, kad nereikia`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.TakeOut2(id);
      } else if (result.isDenied) {
      }
    })
  }

  TakeOut2(id: any){
    Swal.fire({
      icon: 'info',
      title: 'Pranešimas',
      text: 'Pasiimkite ritę iš lentynos',
      footer: '<a href>Nothing is happening?</a>'
    })

    this.model2.Id = id;
    this.model2.QTY = 0;
    this.model2.UserId = this.model.UserId;
    this.reelService.SetLocationWithLocation(this.model2).subscribe(() => {
      this.ngOnInit();
      Swal.fire(
        {
        icon: 'success',
        title: 'Komponetas pasiimtas',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      this.alertify.error(error);
    });
    console.log(id);

  }
  GetName() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.getUserInfo(this.authService.decodedToken.unique_name).subscribe((user: User) => {
        this.user = user;
        this.model.UserId = this.user.id;
      }, error => {
        console.log(error);
      });
    }
  }
}
