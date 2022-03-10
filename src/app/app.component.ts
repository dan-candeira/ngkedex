import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../scss/styles.scss'],
  styles: [
    /*css*/ `
      app-root {
        --gap: 1rem;

        display: grid;
        grid-template-rows: 2.5rem 1fr 3rem;
        gap: var(--gap);
      }

      main {
        width: 80%;
        max-width: 73rem;

        margin-inline: auto;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private _titleService: Title, private _router: Router) {}

  ngOnInit() {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => this._titleService.setTitle('Pokédex'));
  }
}
