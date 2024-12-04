import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private readonly router: Router,
    private alertController: AlertController
  ) {}

  async logout() {
    await this.userService.logout();
    await this.router.navigateByUrl('/login');
  }

  async logoutSubmit() {
    let alert = await this.alertController.create({
      header: 'Alerta',
      message: `¿Está seguro que desea cerrar sesión?`,
      buttons: [
        {
          text: 'Si',
          handler: async () => {
            await this.logout();
          },
        },
        {
          text: 'No',
        },
      ],
    });
    await alert.present();
  }
}
