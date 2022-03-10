import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PokemonEntry } from '@shared/models/pokemon-entry';

@Component({
  selector: 'app-pokemon-entry',
  templateUrl: './pokemon-entry.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PokemonEntryComponent {
  @Input() pokemon: PokemonEntry | null | undefined = null;
  @Input() withLink: boolean = true;
  @Input() imageWidth: number = 233;
  @Input() imageHeight: number = 233;

  constructor() {}
}
