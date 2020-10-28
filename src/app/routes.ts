import{Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_quards/auth.guard';
import { ComponentDetailComponent } from './members/component-detail/component-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { BOMComponent } from './BOM/BOM.component';
import { ComponentEditComponent } from './members/component-edit/component-edit.component';
import { ComponentEditResolver } from './_resolvers/component-edit.resolver';
import { PreventUnsavedChanges } from './_quards/prevent-unsaved-changes.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { ComponentregisterComponent } from './ALLregister/componentregister/componentregister.component';
import { ReelregisterComponent } from './ALLregister/reelregister/reelregister.component';
import { ComponentEdit2Component } from './members/component-edit2/component-edit2.component';
import { AzureloginComponent } from './azurelogin/azurelogin.component';
import { ReelsListComponent } from './Reels/reels-list/reels-list.component';
import { ReelDetailComponent } from './Reels/reel-detail/reel-detail.component';
import { ReelCardComponent } from './Reels/reel-card/reel-card.component';
import { UsedreelListComponent } from './members/usedreel-list/usedreel-list.component';
import { UsedreelListResolver } from './_resolvers/usedreel-list.resolver';
import { PutReelComponent } from './ReelLocations/put-reel/put-reel.component';
import { TakeReelComponent } from './ReelLocations/take-reel/take-reel.component';
import { ReelEditComponent } from './Reels/reel-edit/reel-edit.component';
import { BothComponent } from './ReelLocations/both/both.component';
import { HistoryComponent } from './history/history.component';
import { DialogComponent } from './ReelLocations/put-reel/dialog/dialog.component';
import { FastRegComponent } from './fast-reg/fast-reg.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    
    /*  antras variantas padaryt apsauga   */
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, resolve: {components: MemberListResolver}},
            {path: 'members/:id', component: ComponentDetailComponent, resolve: {components: MemberDetailResolver}},
            {path: 'BOM', component: BOMComponent},
            {path: 'member/edit/:id', component: ComponentEditComponent,
                 resolve: {components: ComponentEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'member/edit2/:id', component: ComponentEdit2Component, resolve: {components: ComponentEditResolver}},
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent},
            {path: 'calendar', component: CalendarComponent},
            {path: 'register/component', component: ComponentregisterComponent},
            {path: 'register/reel', component: ReelregisterComponent},
            {path: 'azure', component: AzureloginComponent},
            {path: 'reels', component: ReelsListComponent},
            {path: 'cardreels', component: ReelCardComponent},
            {path: 'comp/:id', component: UsedreelListComponent},
            {path: 'reels/:id', component: ReelDetailComponent},
            {path: 'reels/edit/:id', component: ReelEditComponent, data: {roles: ['Moderator', 'Admin']}},
            {path: 'locations/put', component: PutReelComponent},
            {path: 'locations/take', component: TakeReelComponent},
            {path: 'locations/both', component: BothComponent},
            {path: 'members/history/:id', component: HistoryComponent, data: {roles: ['Admin']}},
            {path: 'dialog', component: DialogComponent},
            {path: 'fast', component: FastRegComponent, data: {roles: ['Member']}},
            {path: 'admin', component: AdminComponent, data: {roles: ['Admin']}},
            {path: 'userinfo', component: UserComponent}
        ]
    },
      
    /*  antras variantas padaryt apsauga 
    {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    {path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
    */
    
    {path: '**', redirectTo: '', pathMatch: 'full'},
    {path: 'phpmyadmin', redirectTo: 'phpmyadmin', pathMatch: 'full'},
];
