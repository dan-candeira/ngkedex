import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PokemonService } from '@shared/services/pokemon.service';
import { PokemonEntry } from '@shared/models/pokemon-entry';
import { Router, ActivatedRoute } from '@angular/router';
import { map, share } from 'rxjs/operators';

@Component({
	providers: [PokemonService],
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styles: [
		/*css*/ `
			@use 'pokemon-list';
		`,
	],
	encapsulation: ViewEncapsulation.None,
})
export class PokemonListComponent implements OnInit {
	pokemons?: PokemonEntry[];
	count: number = 0;
	offset: number = 0;
	limit: number = 20;
	loading: boolean = false;
	failed: boolean = false;

	constructor(
		private _service: PokemonService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		let observable = this._route.params.pipe(
			map((params) => params['nr']),
			map((pageNr) => (pageNr - 1) * this.limit),
		);
		observable.subscribe((offset) => (this.offset = offset));
		observable
			.pipe(share())
			.subscribe((offset) => this.findAll(offset, this.limit));
	}

	findAll(offset: number, limit: number): void {
		this.pokemons = [];
		this.loading = true;
		this.failed = false;
		this._service.findAll(offset, limit).subscribe({
			next: (result) => {
				this.pokemons = result.pokemons;
				this.count = result.count;
				this.loading = false;
			},
			error: () => {
				this.loading = false;
				this.failed = true;
			},
		});
	}

	onPageChange(offset: number): void {
		this.offset = offset;
		this._router.navigate(['/page', offset / this.limit + 1]);
	}
}
