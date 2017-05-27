import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showHowItWorks = false;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  search(twitchUsername)
  {
    this.router.navigate(['search', twitchUsername]);
  }

}
