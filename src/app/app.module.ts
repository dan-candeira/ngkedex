import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonEntryComponent } from './pokemon-list/pokemon-entry/pokemon-entry.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { PokemonAbilityInfoComponent } from './pokemon-info/pokemon-ability-info/pokemon-ability-info.component';
import { PokemonDescriptionComponent } from './pokemon-info/pokemon-description/pokemon-description.component';
import { PokemonTypesComponent } from './pokemon-info/pokemon-types/pokemon-types.component';
import { PokemonStatsComponent } from './pokemon-info/pokemon-stats/pokemon-stats.component';

import { PaginationComponent } from './shared/pagination/pagination.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoaderComponent } from './shared/loader/loader.component';

import { FeetPipe } from './shared/metrics/feet.pipe';
import { PoundPipe } from './shared/metrics/pound.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonEntryComponent,
    PaginationComponent,
    PokemonInfoComponent,
    NavbarComponent,
    PokemonAbilityInfoComponent,
    FeetPipe,
    PoundPipe,
    PokemonDescriptionComponent,
    PokemonTypesComponent,
    PokemonStatsComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
