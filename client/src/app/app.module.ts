import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2Webstorage } from 'ng2-webstorage';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FAQComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { ClaimComponent } from './claim/claim.component';

import { ApiService } from './services/api.services';
import { LocalDataService } from './services/localdata.services';
import { LolAccountComponent } from './lol-account/lol-account.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:twitchUsername', component: SearchComponent },
  { path: 'search', component: SearchComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'about', component: AboutComponent },
  { path: 'claim/:urlHash', component: ClaimComponent },
  { path: 'claim', component: ClaimComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FAQComponent,
    AboutComponent,
    ClaimComponent,
    LolAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Webstorage,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiService,
    LocalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
