import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

const routes: Routes = [
	{ path: 'pokemon/:id', component: PokemonInfoComponent },
	{ path: 'page/:nr', component: PokemonListComponent },
	{ path: '', redirectTo: '/page/1', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
