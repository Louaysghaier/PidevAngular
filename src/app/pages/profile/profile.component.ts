import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { UserlistService } from './userlist.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User=new User()||{};
  users: User[]= [];

  iduser:any;
  constructor( private login:AccountService,private UserlistService:UserlistService) { 
    this.iduser=login.userid;
    console.log(this.iduser);
  }

  ngOnInit(): void {
    //console.error('profile');

   // this.user = this.login.getCurrentUser();
   this.login.getCurrentUser(this.iduser).subscribe(
     (user:User) =>{
        this.user=user;
        console.log(user);
      },
      (error)=>{
        alert('errp!!!');
      }
    )
    this.getAllUsers();

  }

public getAllUsers() {
  this.UserlistService.getUserList().subscribe(data => {
    this.users = data;
  });
}
private getUser() {
  this.UserlistService.getUserList().subscribe(data => {
    this.users = data;
  });
}




activateUser(user: User): void {
  if (user.id) {
    this.UserlistService.debloqueruser(user.id).subscribe(
      () => {
        console.log('Utilisateur activé avec succès.');
        this.getAllUsers();
        // user.valid=true;
        // Faire quelque chose après l'activation réussie
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'activation :', error);
        // Gérer l'erreur d'activation
      }
    );
  }
}

bloqueUser(user: User): void {
  this.UserlistService.bloquerUser(user.id ?? 0).subscribe(
    () => {

      console.log('Utilisateur activé avec succès.');
      this.getAllUsers();
      // user.valid=true;
      // Faire quelque chose après l'activation réussie
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de l\'activation :', error);
      // Gérer l'erreur d'activation
    }
  );
}


}
