import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'safeString',
})
export class SafeStringPipe implements PipeTransform {
	transform(value: string | undefined | null): string | null {
		if (!value || !(typeof value === 'string')) {
			return null;
		}
		return value
			.trim()
			.toLowerCase()
			.replace(/[^a-zA-Z0-9]/g, ' ');
	}
}
