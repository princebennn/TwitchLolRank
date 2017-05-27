import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {  ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../services/api.services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public sub:any;
  public twitchUser:any;
  public twitchUsername:String;
  public error = false;
  public noAccounts = false;
  public success = false;


  constructor(public route: ActivatedRoute, public router: Router, public api:ApiService,) {
    this.sub = this.route.params.subscribe(params => {
      if (params['twitchUsername'])
      {
        this.twitchUsername = params['twitchUsername'];
        this.search(params['twitchUsername']);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search(twitchUsername: String) {
    console.log(twitchUsername);
    this.error = false;
    this.api.getTwitchUser(twitchUsername)
                   .subscribe(
                     twitchUser => this.processTwitchUser(twitchUser),
                     error =>  { this.error = true; console.error(error); });
  }

  processTwitchUser(twitchUser)
  {
    this.twitchUser = twitchUser;
    this.success = true;
    if (!this.twitchUser.twitchUsername)
      this.error=true;
    if (this.twitchUser.lolAccounts.length == 0)
      this.noAccounts = true;
  }

  onSearch(twitchUsername: String) {
    this.router.navigate(['search', twitchUsername]);
  }
}
