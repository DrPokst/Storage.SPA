import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Components } from '../_models/components';
import { AlertifyService } from '../_services/alertify.service';
import { ComponentService } from '../_services/component.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<Components>{
    constructor(private componentService: ComponentService, private router: Router, private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Components>{
        return this.componentService.getComponent(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problemos gaunant data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}

