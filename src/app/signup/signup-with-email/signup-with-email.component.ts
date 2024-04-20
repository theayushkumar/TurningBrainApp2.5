import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/servies/crud.service';
import { SharedService } from 'src/app/servies/shared.service';

@Component({
  selector: 'app-signup-with-email',
  templateUrl: './signup-with-email.component.html',
  styleUrls: ['./signup-with-email.component.css']
})
export class SignupWithEmailComponent {

  regForm !: FormGroup
  courses: any
  countery_data: any
  constructor(
    private fb: FormBuilder,
    private _shared: SharedService,
    private _crud: CrudService,
    private _router: Router
  ) { }

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  filteredOptions: any;
  filterByState: any
  countery_data_filter: any
  ngOnInit() {
    this.regForm = this.fb.group({
      Name: ['', Validators.required],
      Emailid: ['', Validators.required],
      Course: ['', Validators.required],
      College: ['', Validators.required],
      CountryName: ['', Validators.required],
      MobileNo: ['', Validators.required],
      profile: [],
      Password: [
        '', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[0-9]/),
          Validators.pattern(/[!@#$]/),
        ]
      ],

    })

    this._shared.email.subscribe(
      (res: any) => {
        console.log(res);
        this.regForm.controls['Emailid'].setValue(res)

      }
    )

    this.get_course()
    this._crud.get_countery().subscribe(
      (res: any) => {
        console.log(res);
        const data = res
        this.countery_data = data.filter((cou: any) => cou.name !== "India");
        this.countery_data_filter = data.filter((cou: any) => cou.name !== "India");
      }
    )
  }


  onSelect(data: any) {
    console.log(data.value);
    const filterV = data.value.toLowerCase();
    console.log(filterV);

    this.countery_data_filter = this.countery_data.filter((f: any) => f.name.toLowerCase().includes(filterV));
  }


  get_course() {
    this._crud.get_course().subscribe(
      (res: any) => {
        console.log(res);
        this.courses = res
      }
    )


  }


  onSubmit() {
    const fromdata = new FormData()
    fromdata.append('Name', this.regForm.get('Name')?.value),
      fromdata.append('Emailid', this.regForm.get('Emailid')?.value),
      fromdata.append('MobileNo', this.regForm.get('MobileNo')?.value),
      fromdata.append('Course', this.regForm.get('Course')?.value),
      fromdata.append('CountryName', this.regForm.get('CountryName')?.value),
      fromdata.append('State', ''),
      fromdata.append('College', this.regForm.get('College')?.value),
      fromdata.append('Password', this.regForm.get('Password')?.value),

      console.log(this.regForm.value);
    this._crud.reg_post(fromdata).subscribe(
      (res: any) => {
        console.log(res);
        if (res == 'Already Exist') {
          this._shared.tostErrorBottom('This Mobile Already Exist..')
        }
        if (res == 'Success') {
          this._shared.tostSuccessTop('Registation Successfully')
          this._router.navigate(['/'])
        }

      }
    )
  }


}
