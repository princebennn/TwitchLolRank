import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lol-account',
  inputs: [
    'lolAccount'
  ],
  templateUrl: './lol-account.component.html',
  styleUrls: ['./lol-account.component.css']
})
export class LolAccountComponent implements OnInit {

  public lolAccount;

  constructor() {
  }

  ngOnInit() {
    console.log(this.lolAccount);
  }

}
