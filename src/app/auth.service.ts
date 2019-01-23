import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.user$ = angularFireAuth.authState;
  }

  login() {
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    if (this.user$) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
