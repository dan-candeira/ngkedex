import { Component, Input } from '@angular/core';
import { PokemonDescription } from '@shared/models/pokemon-description';

@Component({
	selector: 'app-pokemon-description',
	template: `
		<details
			class="card details"
			*ngFor="let description of (descriptions | unique:'description')"
		>
			<summary>
				<h3>
					{{ description.version }}
				</h3>
			</summary>
			<p>
				{{ description?.description | safeString }}
			</p>
		</details>
	`,
})
export class PokemonDescriptionComponent {
	@Input() descriptions?: PokemonDescription[];
}
