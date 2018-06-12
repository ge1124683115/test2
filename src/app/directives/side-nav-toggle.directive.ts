import {Directive, ElementRef, HostListener} from '@angular/core';
import {EventBusService} from '../core/common-services/event-bus.service';
@Directive({
  selector: '[appSideNavToggle]'
})
export class SideNavToggleDirective {

  constructor(private el: ElementRef, public eventBusService: EventBusService) { }

  @HostListener('click') onClick() {
    this.hideSideNav();
  }

  private hideSideNav() {
    this.eventBusService.sideNavChange.next(true);
  }
}
