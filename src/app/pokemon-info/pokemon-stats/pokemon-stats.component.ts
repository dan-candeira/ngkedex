import { Component, Input } from '@angular/core';
import { PokemonStats } from '@shared/models/pokemon-stats';

@Component({
	selector: 'app-pokemon-stats',
	templateUrl: './pokemon-stats.component.html',
})
export class PokemonStatsComponent {
	@Input() stats?: PokemonStats;

	getStatPercent(value?: number): string {
		if (value == null) {
			return '0%';
		}
		return (value / 255) * 100 + '%';
	}
}
