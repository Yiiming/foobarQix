import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foobarqix';
  public currentRoute = '';

  constructor(private router: Router) {
    this.router.events.subscribe(
      event => {
        this.currentRoute = this.router.url
      }
    )
  }

  ngOnInit() {
    
  }

  public openKataFoobar() {
    window.open('https://codingdojo.org/kata/FooBarQix/', '_blank');
  }
}