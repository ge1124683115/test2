import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { WidgetModule } from './widget/widget.module';
import { ViewsModule } from './views/views.module';
import { DirectivesModule } from './directives/directives.module';

import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    WidgetModule,
    ViewsModule,
    DirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
