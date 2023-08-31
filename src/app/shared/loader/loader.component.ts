import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
})
export class LoaderComponent {
	@Input() loading: boolean | null = false;
	@Input() failed: boolean | null = false;
}
