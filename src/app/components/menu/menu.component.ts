import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuId: string = 'default-menu-id';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  async logout(){
    await this.userService.logout();
    await this.router.navigateByUrl("/login");
  }
}
