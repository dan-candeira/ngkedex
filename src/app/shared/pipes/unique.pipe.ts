import { Pipe, PipeTransform } from '@angular/core';
import { uniqBy } from 'lodash';

@Pipe({
	name: 'unique',
})
export class UniquePipe implements PipeTransform {
	transform(value: any[] | undefined | null, key: string): any[] | null {
		if (!value || !Array.isArray(value)) {
			return null;
		}
		return uniqBy(value, (obj) =>
			obj[key]
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z0-9]/g, ''),
		);
	}
}
