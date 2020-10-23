import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogComponent } from '../ReelLocations/put-reel/dialog/dialog.component';
import { Components } from '../_models/components';
import { Reels } from '../_models/Reels';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { ComponentService } from '../_services/component.service';
import { ReelService } from '../_services/reel.service';

@Component({
  selector: 'app-fast-reg',
  templateUrl: './fast-reg.component.html',
  styleUrls: ['./fast-reg.component.css'],
  providers: [DialogComponent]
})
export class FastRegComponent implements OnInit {
  isLinear = false;
  registerForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  model: any = {};
  public imagePath;
  imageURL: string;
  url: any;
  components: Components[];
  options: string[] = [];
  mnf: string;
  id: number;
  qty: number;
  reels: Reels;
  jwtHelper = new JwtHelperService();
  condition = false;

  constructor(private componentService: ComponentService,
              private reelService: ReelService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private dialogComponent: DialogComponent,
              public authService: AuthService,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.loadMnfs();
    this.registerForm = new FormGroup(
      {
        CMnf: new FormControl(),
        QTY: new FormControl(),
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required])
      }

    );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  InputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  loadMnfs() {
    this.componentService.getMnfs().subscribe((components: Components[]) => {
      this.components = components;
      console.log(this.components);
      for (let index = 0; index < components.length; index++) {
        this.options[index] = this.components[index].mnf;
      }
      this.condition = true;
      // tslint:disable-next-line: no-unused-expression
    }), error => {
      this.alertify.error(error);
    };
  }
  openDialog() {
    this.dialog.open(DialogComponent);
  }


  SetLocation() {
    this.model.Id = this.id;
    this.model.QTY = 0;
    this.model.Token = localStorage.getItem('token');
    this.reelService.SetLocation(this.model).subscribe(() => {
      this.alertify.success('sekmingai uzregistruota');
      this.ngOnInit();
      this.dialogComponent.close();
    }, error => {
      this.alertify.error(error);
      this.dialogComponent.close();
    });

    console.log(this.model);
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.registerForm.patchValue({

        fileSource: file

      });
    }
  }

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registerForm.patchValue({
      fileSource: file
    });
    this.registerForm.get('fileSource').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit() {

    const formData = new FormData();

    formData.append('file', this.registerForm.get('fileSource').value);
    formData.append('CMnf', this.registerForm.get('CMnf').value);
    formData.append('QTY', this.registerForm.get('QTY').value);

    this.model = Object.assign({}, this.registerForm.value);

    this.mnf = this.registerForm.get('CMnf').value;
    this.qty = this.registerForm.get('QTY').value;

    this.reelService.registerReel(formData).subscribe(() => {
      this.alertify.success('sekmingai uzregistruota');
      this.loadReel(this.mnf);
    }, error => {
      this.alertify.error(error);
    });
    console.log(this.registerForm.get('CMnf').value);
    this.registerForm.reset();
    this.imageURL = null;
  }

  loadReel(Tmnf) {
    this.reelService.getReelMnf(Tmnf).subscribe((reels: Reels) => {
      this.reels = reels;
      this.mnf = this.reels.cMnf;
      this.id = this.reels.id;
      console.log(this.reels.id);
      this.ngOnInit();
    }, error => {
      this.alertify.error(error);
    });
  }
}