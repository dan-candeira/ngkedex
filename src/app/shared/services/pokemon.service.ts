import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PokemonList } from '../models/pokemon-list';
import { PokemonEntry } from '../models/pokemon-entry';
import * as _ from 'lodash';
import { Pokemon } from '../models/pokemon';
import { PokemonAbilityInfo } from '../models/pokemon-ability-info';
import { PokemonAbility } from '../models/pokemon-ability';
import { PokemonDescription } from '../models/pokemon-description';
import { PokemonStats } from '../models/pokemon-stats';
import { PokemonType } from '../models/pokemon-type';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonService {
  private _baseUrl: string = 'https://pokeapi.co/api/v2';
  private _spriteBaseUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
  private _detailRegex = /^https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\/$/;
  private _language = 'en';

  constructor(private _http: HttpClient) {}

  findAll(offset: number = 0, limit: number = 20): Observable<PokemonList> {
    return this._http
      .get(`${this._baseUrl}/pokemon/?offset=${offset}&limit=${limit}`)
      .pipe(
        map((response) => response),
        map((results) => this.getList(results))
      );
  }

  findOne(id: number): Observable<Pokemon> {
    return forkJoin({
      pokemon: this._http
        .get(`${this._baseUrl}/pokemon/${id}/`)
        .pipe(map((response) => response)),
      species: this._http
        .get(`${this._baseUrl}/pokemon-species/${id}/`)
        .pipe(map((response) => response)),
    }).pipe(
      map(
        (data: any) =>
          new Pokemon(
            new PokemonEntry(
              data[0].id,
              _.capitalize(data[0].name),
              `${this._spriteBaseUrl}/${data[0].id}.png`
            ),
            new PokemonAbilityInfo(
              data[0].height,
              data[0].weight,
              this.getAbilities(data[0].abilities),
              this.getCategory(data[1].genera)
            ),
            this.getDescriptions(data[1]['flavor_text_entries']),
            this.getTypes(data[0].types),
            this.getStats(data[0].stats)
          )
      )
    );
  }

  getList(data: any): PokemonList {
    // Manually filter all pokémons above 10000 since these are not official but mega evolutions
    let results = data.results
      .map((result: any) => this.getEntry(result))
      .filter((entry: any) => entry.id < 10000);
    // Manually override count to 721 to exclude mega's
    return new PokemonList(results, 721);
  }

  getEntry(data: any): PokemonEntry {
    const matches = this._detailRegex.exec(data.url),
      id: any = matches == null ? null : parseInt(matches[1]),
      sprite: any = id == null ? null : `${this._spriteBaseUrl}/${id}.png`;
    return new PokemonEntry(id, _.capitalize(data.name), sprite);
  }

  getAbilities(abilities: any[]): PokemonAbility[] {
    return abilities
      .map(
        (ability) =>
          new PokemonAbility(
            _.startCase(ability.ability.name),
            ability['is_hidden'],
            ability.slot
          )
      )
      .sort((ability1, ability2) => ability1.order - ability2.order);
  }

  getCategory(genera: any[]): string {
    return genera.find((genera) => genera.language.name === this._language)
      .genus;
  }

  getDescriptions(entries: any[]): PokemonDescription[] {
    return entries
      .filter((entry) => entry.language.name === this._language)
      .map(
        (entry) =>
          new PokemonDescription(
            entry['flavor_text'],
            _.startCase(_.replace(entry.version.name, '-', ' '))
          )
      );
  }

  getTypes(types: any[]): PokemonType[] {
    return types
      .map((type) => new PokemonType(type.type.name, type.slot))
      .sort((type1, type2) => type1.order - type2.order);
  }

  getStats(stats: any[]): PokemonStats {
    return new PokemonStats(
      stats.find((stat) => stat.stat.name === 'hp')['base_stat'],
      stats.find((stat) => stat.stat.name === 'attack')['base_stat'],
      stats.find((stat) => stat.stat.name === 'defense')['base_stat'],
      stats.find((stat) => stat.stat.name === 'special-attack')['base_stat'],
      stats.find((stat) => stat.stat.name === 'special-defense')['base_stat'],
      stats.find((stat) => stat.stat.name === 'speed')['base_stat']
    );
  }
}
