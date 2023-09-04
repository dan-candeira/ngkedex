import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { RequestState } from '@shared/services/request-state.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	constructor(private requestState: RequestState) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		this.requestState.loading$.next(true);

		return next.handle(request).pipe(
			delay(300),
			map<HttpEvent<any>, any>((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					this.requestState.loading$.next(false);
					this.requestState.failed$.next(false);
				}
				return event;
			}),
			catchError((error: any) => {
				this.requestState.loading$.next(false);
				this.requestState.failed$.next(true);
				return of(error);
			}),
		);
	}
}
