import { Component, OnInit } from '@angular/core';
import { MenuServiceNs } from '../../core/common-services/menu.service';

@Component({
  selector: 'app-nav-breadcrumb',
  templateUrl: './nav-breadcrumb.component.html',
  styleUrls: ['./nav-breadcrumb.component.scss']
})
export class NavBreadcrumbComponent implements OnInit {

  private menuList: MenuServiceNs.MenuAuthorizedItemModel[];
  private navUrlList: string[];
  private subHandler: any;

  constructor( private menuService: MenuServiceNs.MenuService) {
    this.menuList = [];
    this.navUrlList = [];
  }

  private trackById(item: any, index: number){
    return item.id;
  }

  ngOnInit() {
    this.subHandler = this.menuService.menuNavChange.subscribe((list: MenuServiceNs.MenuAuthorizedItemModel[]) => {
      this.menuList = list;
    });
  }
  ngOnDestroy(){
    this.subHandler.unsubscribe();
  }

}
