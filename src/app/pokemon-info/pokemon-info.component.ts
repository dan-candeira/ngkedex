import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '@shared/services/pokemon.service';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, tap } from 'rxjs/operators';
import { Pokemon } from '../shared/models/pokemon';

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
			this._titleService.setTitle(
				`#${pokemon?.baseInfo?.id} - ${pokemon?.baseInfo?.name}`,
			);
		}),
		catchError(() => {
			return of({});
		}),
	);

	constructor(
		private _route: ActivatedRoute,
		private _service: PokemonService,
		private _titleService: Title,
	) {}
}
