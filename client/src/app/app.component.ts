import { Component } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, factoryIcon, listIcon, nodesIcon, objectsIcon, plusIcon, popOutIcon, userIcon, usersIcon } from '@cds/core/icon';

ClarityIcons.addIcons(plusIcon);
ClarityIcons.addIcons(popOutIcon);
ClarityIcons.addIcons(usersIcon);
ClarityIcons.addIcons(listIcon);
// ClarityIcons.addIcons(nodesIcon);
ClarityIcons.addIcons(objectsIcon);
ClarityIcons.addIcons(factoryIcon);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'production-suite';
}
