import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foobarqix';

  public openKataFoobar() {
    window.open('https://codingdojo.org/kata/FooBarQix/', '_blank');
  }
}