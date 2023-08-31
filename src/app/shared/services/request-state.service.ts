import { Injectable } from '@angular/core';
import { Subject, switchMap } from 'rxjs';

@Injectable()
export class RequestState {
	loading$ = new Subject<boolean>();
	failed$ = new Subject<boolean>();
}
