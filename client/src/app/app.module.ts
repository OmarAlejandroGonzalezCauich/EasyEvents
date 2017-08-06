import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRountingProviders } from './app.routing';
import { HomeComponent } from './components/home.component';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';

import { ProviderAddComponent } from './components/provider-add.component';
import { ProviderEditComponent } from './components/provider-edit.component';
import { ProviderListComponent } from './components/provider-list.component';
import { ProviderDetailComponent } from './components/provider-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ProviderListComponent,
    ProviderAddComponent,
    ProviderEditComponent,
    ProviderDetailComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRountingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
