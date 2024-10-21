import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LOGGED_USER_KEY } from 'src/app/constants/storage_keys';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = 'guest';

  constructor(
    private router: Router,
    private readonly storageService: StorageService
  ) {}

  async ngOnInit() {
    console.log('ngOnInit');
    const loggedUser = await this.storageService.get(LOGGED_USER_KEY);
    this.username = loggedUser.username;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
