import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  userForm: FormGroup;




  constructor(private _fb: FormBuilder, private _userService: UsersService) {
    this.userForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: ''
    })
  }

  refreshPage(){
    window.location.reload();
  }

  onFormSubmit(){
    if(this.userForm.valid){
      this._userService.addUser(this.userForm.value).subscribe({
        next:(val:any) =>{
        alert('User Added');


        },
        error:(err: any) =>
        console.log(err)
      })
    }
  }
}
