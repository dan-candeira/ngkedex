import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { PokemonService } from '@shared/services/pokemon.service';
import { PokemonEntry } from '@shared/models/pokemon-entry';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { RequestState } from '@shared/services/request-state.service';

@Component({
	providers: [PokemonService],
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styles: [],
	encapsulation: ViewEncapsulation.None,
})
export class PokemonListComponent {
	private service = inject(PokemonService);
	private router =  inject(Router);
	private route = inject(ActivatedRoute);
	private loadingState = inject(RequestState);

	pokemons$: Observable<PokemonEntry[]> = this.route.params.pipe(
		map((params) => params['nr']),
		map((pageNr: any) => (pageNr - 1) * this.limit),
		switchMap((offset: any) => {
			this.offset = offset;
			return this.service.findAll(offset, this.limit);
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
		this.loadingState.loading$,
	]).pipe(map(([pokemons, loading]) => ({ pokemons, loading })));

	onPageChange(offset: number): void {
		this.offset = offset;
		this.router.navigate(['/page', offset / this.limit + 1]);
	}
}
