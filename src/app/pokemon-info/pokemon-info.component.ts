import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '@shared/services/pokemon.service';
import { Pokemon } from '../shared/models/pokemon';
import { Title } from '@angular/platform-browser';
import { catchError, map, mergeMap, share, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
	providers: [PokemonService],
	selector: 'app-pokemon-info',
	templateUrl: './pokemon-info.component.html',
})
export class PokemonInfoComponent {
	pokemon$: Observable<Pokemon> = this._route.params.pipe(
		map((params) => params['id']),
		mergeMap((id) => this._service.findOne(id)),
		tap((pokemon) => {
			this.loading$.next(false);
			this._titleService.setTitle(
				`#${pokemon?.baseInfo?.id} - ${pokemon?.baseInfo?.name}`,
			);
		}),
		catchError(() => {
			this.loading$.next(false);
			this.failed$.next(true);
			return of({});
		}),
	);
	loading$ = new BehaviorSubject<boolean>(true);
	failed$ = new BehaviorSubject<boolean>(false);

	constructor(
		private _route: ActivatedRoute,
		private _service: PokemonService,
		private _titleService: Title,
	) {}
}
