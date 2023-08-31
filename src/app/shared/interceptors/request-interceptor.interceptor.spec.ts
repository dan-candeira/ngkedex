import { TestBed } from '@angular/core/testing';

import { RequestInterceptorInterceptor } from './request-interceptor.interceptor';

describe('RequestInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestInterceptorInterceptor = TestBed.inject(RequestInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
