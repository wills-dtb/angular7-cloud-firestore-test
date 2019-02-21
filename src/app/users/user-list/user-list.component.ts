import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  list: User[];
  constructor(private service: UserService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getUsers().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as User;
      })
    });
  }

  onEdit(id:User) {
    this.service.formData = Object.assign({}, id);
  }

  onDelete(id:string) {
    if(confirm("This will permanently delete this record. Are you sure you want to do that?")) {
      this.firestore.doc('users/' + id).delete();
      this.toastr.warning('Record successfully deleted');
    }
  }

}
