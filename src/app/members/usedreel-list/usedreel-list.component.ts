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
}
