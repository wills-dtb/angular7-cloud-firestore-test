import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: UserService,
    private firestore:AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form != null)
    form.resetForm();
    this.service.formData = {
      id: null,
      fullName: '',
      email: '',
      password: '',
      type: '',
      phone: '',
    }
  }

  onSubmit(form: NgForm) {
    let data = form.value;
    this.firestore.collection('users').add(data);
    this.resetForm(form);
    this.toastr.success("User registered successfully", "User Registration");
  }

}
