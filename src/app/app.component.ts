import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { RequestState } from '@shared/services/request-state.service';
import { Observable } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	// styleUrls: ['../styles/css/global.css'],
	styles: [
		`
			app-root {
				--gap: 1rem;

				/* display: grid;
				grid-template-rows: 2.5rem 1fr 3rem;
				gap: var(--gap); */
				display: flex;
				flex-direction: column;
				gap: 2rem;
				height: 100%;
			}
		`,
	],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
	loading$: Observable<boolean> = this._requestState.loading$.pipe(
		delay(0),
	);
	failed$ = this._requestState.failed$;

	constructor(
		private _titleService: Title,
		private _router: Router,
		private _requestState: RequestState,
	) {}

	ngOnInit() {
		this._router.events
			.pipe(filter((event) => event instanceof NavigationStart))
			.subscribe((event) => this._titleService.setTitle('Pokédex'));
	}
}
