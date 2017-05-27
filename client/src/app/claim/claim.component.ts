import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {  ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../services/api.services';
import { LocalDataService } from '../services/localdata.services';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  public sub:any;
  public urlHash:String;
  public twitchAuthCode:String;
  public loading = false;
  public success = true;
  public claiming = false;
  public twitchUsername:String = "";

  constructor(public route: ActivatedRoute, public router: Router, public api:ApiService, public localData: LocalDataService) {
    this.sub = this.route.params.subscribe(params => {
      if (params['urlHash'])
      {
        this.urlHash = params['urlHash'];
        this.claiming = true;
      }
    });
    this.sub = this.route.queryParams.subscribe(params => {
      if (params['code'] && params['state'])
      {
        this.twitchUsername = this.localData.getTwitchUsername();
        this.twitchAuthCode = params['code'];
        this.urlHash = params['state'];
        this.loading = true;
      }
    });
  }

  ngOnInit() {
    if (!this.claiming)
      this.claimAccount();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  claimAccount() {
    this.api.claimAccount(this.twitchAuthCode, this.urlHash)
                   .subscribe(
                    success => this.successClaim(success),
                     error =>  { this.loading = false; this.success = false;});

  }

  successClaim(data)
  {
    this.localData.setTwitchUsername(data.username);
    this.twitchUsername = this.localData.getTwitchUsername();
    this.loading = false;
    console.log(data.username);
  }

}
