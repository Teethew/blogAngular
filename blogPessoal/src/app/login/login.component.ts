import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  feed: FeedComponent;

  userLogin: UserLogin = new UserLogin();

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit(): void {
  }

  logar() {
    this.authService.logar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;
      localStorage.setItem('token', this.userLogin.token);
      this.router.navigate(['/feed']);
      this.feed.findAllPostagens();

    }, err => {
      if(err.status == '500')
        this.alert.showAlertDanger("Ou você ainda não se cadastrou ou a senha está incorreta. 👮‍♂️");
    });
  }

}
