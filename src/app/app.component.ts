import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'proto-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private isLoggedIn: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    // This asynchronously checks if our user is logged in and will automatically
    // redirect them to the Login page when the status changes.
    this.auth.authStatus().subscribe(
      (auth) => {
        if(auth == null) {
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );
  }

  logout() {
    this.auth.logout();
  }
}
