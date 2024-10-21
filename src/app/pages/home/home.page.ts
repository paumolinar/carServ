import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  username: string = 'guest'


  constructor(private router: Router) {}

  ngOnInit() {
    console.log('ngOnInit')
    //obtener el username del storage
    // almacenar el valor de username en el nombre de usuario
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
