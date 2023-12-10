import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  hideConfirm: boolean = true;
  imgSrc: any;
  currentUser: any;

  constructor(
    private _ProfileService: ProfileService,
    private _ToastrService: ToastrService,
    private Router: Router
  ) {}

  ngOnInit() { 
    this.getCurrentUser()
    this.onSubmit(this.editProfileForm)}
    editProfileForm = new FormGroup({
    userName: new FormControl(null, [Validators.required,
      Validators.pattern('([a-zA-Z]){3,12}([0-9]{1,3})'),
    ]),
    email: new FormControl(null, [Validators.required,Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required,
      Validators.pattern('^(01|01|00201)[0-2,5]{1}[0-9]{8}'),
    ]),
    profileImage: new FormControl(null),
    confirmPassword: new FormControl(null, [Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
  });
  onSubmit(data: FormGroup) {
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, value] of myMap) {
      myData.append(key, data.value[key]);
    }
    myData.append('profileImage', this.imgSrc, this.imgSrc['name']);
    this._ProfileService.editProfile(myData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'error');
      },
      complete: () => {
        this._ToastrService.success('profile updated now you should log out then log in again!', 'success');
        this.Router.navigate(['/dashboard/profile']);
        localStorage.setItem('userName', data.value.userName);
      },
    });
  }
  getCurrentUser(){
    this._ProfileService.getCurrentUser().subscribe({
      next:(res)=>{
        this.currentUser = res
        console.log(this.currentUser);
      },error:(err)=>{
        console.log(err);
      },
        complete:()=>{          
          this.imgSrc = 'https://upskilling-egypt.com/'+this.currentUser?.profileImage,
          this.editProfileForm.patchValue({
            userName:this.currentUser?.userName,
            email:this.currentUser?.email,
            country:this.currentUser?.country,
            phoneNumber:this.currentUser?.phoneNumber,
          }); 
          
      }
    })
  }

  files: File[] = [];
  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
