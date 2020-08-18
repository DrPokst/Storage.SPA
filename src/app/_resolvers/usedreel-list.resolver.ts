import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reels } from '../_models/Reels';
import { CompareService } from '../_services/compare.service';

@Injectable()
export class UsedreelListResolver implements Resolve<Reels[]>{
    constructor(private compareService: CompareService, private router: Router, private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Reels[]>{
        return this.compareService.getCompare(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problemos gaunant data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}

