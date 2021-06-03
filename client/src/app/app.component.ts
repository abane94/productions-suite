import { Component } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusIcon, popOutIcon, userIcon } from '@cds/core/icon';

ClarityIcons.addIcons(plusIcon);
ClarityIcons.addIcons(popOutIcon);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'production-suite';
}
