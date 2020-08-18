import { Injectable } from '@angular/core';
import {  CanDeactivate} from '@angular/router';
import { ComponentEditComponent } from '../members/component-edit/component-edit.component';


@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<ComponentEditComponent> {
    canDeactivate(component: ComponentEditComponent) {
        if (component.editForm.dirty){
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return false;
    }
}
