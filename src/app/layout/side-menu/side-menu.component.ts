import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuServiceNs } from '../../core/common-services/menu.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'side-menu',
  styleUrls: ['./side-menu.component.scss'],
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {
  @Input() sideMenu: MenuServiceNs.MenuAuthorizedItemModel[];
  @Input() width: string;
  @Input() isCollapsed: boolean;
  @Input() isNeedSideNavShow: boolean;
  @Output() isCollapsedChange: EventEmitter<boolean>;
  selectedItem: string;
  selectedMenu: MenuServiceNs.MenuAuthorizedItemModel;
  isCollapsedList: boolean;
  constructor(public router: Router) {
    this.isCollapsedChange = new EventEmitter();
    this.isCollapsed = false;
    this.width = '210px';
    this.sideMenu = [];
    this.isNeedSideNavShow = false;
    this.isCollapsedList = false;
    this.router.events
      .subscribe((event: NavigationEnd) => {
        if (event instanceof  NavigationEnd) {
          this.selectedItem = event.urlAfterRedirects;
        }
      });
  }
  public toggleCollapsed () {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }
  public navigate (menu: MenuServiceNs.MenuAuthorizedItemModel) {
    if (!menu) {
      return;
    }
    this.selectedMenu = menu;
    if (menu.children && menu.children.length > 0) {
      this.isNeedSideNavShow = true;
      this.selectedMenu = menu;
      return;
    }
    this.isNeedSideNavShow = false;
    this.selectedItem = menu.url;
    this.router.navigateByUrl(menu.url);
  }
  public hideSideNav() {
    this.isNeedSideNavShow = false;
  }
}
