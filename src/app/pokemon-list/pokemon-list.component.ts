import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PokemonService } from '@shared/services/pokemon.service';
import { PokemonEntry } from '@shared/models/pokemon-entry';
import { Router, ActivatedRoute } from '@angular/router';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { PokemonList } from '@shared/models/pokemon-list';
import { RequestState } from '@shared/services/request-state.service';

@Component({
	providers: [PokemonService],
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styles: [],
	encapsulation: ViewEncapsulation.None,
})
export class PokemonListComponent implements OnInit {
	pokemons$: Observable<PokemonEntry[]> = this._route.params.pipe(
		map((params) => params['nr']),
		map((pageNr: any) => (pageNr - 1) * this.limit),
		switchMap((offset: any) => {
			this.offset = offset;
			return this._service.findAll(offset, this.limit);
		}),
		tap(({ count }) => {
			this.count = count;
		}),
		map(({ pokemons }) => pokemons),
	);
	count: number = 0;
	offset: number = 0;
	limit: number = 20;
	data$ = combineLatest([
		this.pokemons$,
		this._loadingState.loading$,
	]).pipe(map(([pokemons, loading]) => ({ pokemons, loading })));

	constructor(
		private _service: PokemonService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _loadingState: RequestState,
	) {}

	ngOnInit(): void {
		// observable
		// 	.pipe(share())
		// 	.subscribe((offset) => this.findAll(offset, this.limit));
	}

	// findAll(offset: number, limit: number): void {
	// 	this.pokemons = [];
	// 	;
	// }

	onPageChange(offset: number): void {
		this.offset = offset;
		this._router.navigate(['/page', offset / this.limit + 1]);
	}
}
