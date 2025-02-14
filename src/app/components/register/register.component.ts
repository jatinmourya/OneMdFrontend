import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  service = inject(ServiceService);
  dialog = inject(MatDialog);
  arouter = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit() {
    this.id = this.arouter.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.editMode = true;
      this.service.getDataById(this.id).subscribe((res: any) => {
        this.registerForm.patchValue(res);
        this.registerForm.setControl('degrees', this.fb.array([]));
        for (let i = 0; i < res.degrees.length; i++) {
          this.addDegree(res.degrees[i].degree);
        }
      });
    } else {
      this.registerForm = this.setForm();
    }

    console.log(this.registerForm.controls?.['degrees']);
    console.log(this.registerForm.value);
  }
  id: any = '';
  editMode: boolean = false;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwdPattern = /^(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirm_password')?.value;

      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  registerForm: any = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwdPattern)],
      ],
      confirm_password: [
        '',
        [Validators.required, Validators.pattern(this.passwdPattern)],
      ],
      date_of_graduation: ['', [Validators.required]],
      degrees: this.fb.array([]),
      online_consult_fees: ['', [Validators.required, Validators.min(0)]],
      offline_consult_fees: ['', [Validators.required, Validators.min(0)]],
    },
    { validators: this.passwordMatchValidator() }
  );

  setForm() {
    return this.fb.group(
      {
        name: ['Jatin', [Validators.required]],
        email: [
          'jatinmourya07798@gmail.com',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        mobile: ['9619435736', [Validators.required]],
        password: [
          '',
          [Validators.required, Validators.pattern(this.passwdPattern)],
        ],
        confirm_password: [
          '',
          [Validators.required, Validators.pattern(this.passwdPattern)],
        ],
        date_of_graduation: ['2015-02-02', [Validators.required]],
        degrees: this.fb.array([
          this.fb.group({ degree: ['MBBS', [Validators.required]] }),
          this.fb.group({ degree: ['BSC', [Validators.required]] }),
        ]),
        online_consult_fees: ['1000', [Validators.required, Validators.min(0)]],
        offline_consult_fees: [
          '1500',
          [Validators.required, Validators.min(0)],
        ],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  get getDegrees(): FormArray {
    return this.registerForm?.controls?.['degrees'] as FormArray;
  }

  addDegree(d: any = '') {
    this.getDegrees.push(this.fb.group({ degree: [d, [Validators.required]] }));
  }

  removeDegree(i: any) {
    // console.log(i);
    // console.log(this.getDegrees.controls.length);
    // console.log(this.getDegrees.value);

    this.getDegrees.removeAt(i);
  }

  hide1 = signal(true);
  clickEvent1(event: MouseEvent) {
    this.hide1.set(!this.hide1());
    event.stopPropagation();
  }

  hide2 = signal(true);
  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }

  @ViewChild('dialogbox') dialogboxx: any;
  @ViewChild('dialogbox2') dialogboxx2: any;

  submit(f: any) {
    console.log(f);
    console.log(f.valid);
    if (f.valid) {
      console.log(f.value);
      let obj = f.value;
      let gd = new Date(obj.date_of_graduation).toISOString().slice(0, 10);
      obj = { ...obj, date_of_graduation: gd };
      if (this.editMode) {
        let d = this.dialog.open(this.dialogboxx);
        d.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          if (result) {
            this.service.updateData(this.id, obj).subscribe((res: any) => {
              let d = this.dialog.open(this.dialogboxx2);
              console.log(res);
            });
          }
        });
      } else {
        this.service.postData(obj).subscribe((res: any) => {
          console.log(res);
          let d = this.dialog.open(this.dialogboxx2);
          this.router.navigate(['/']);
        });
      }
    } else {
      f.markAllAsTouched();
    }
  }
}
