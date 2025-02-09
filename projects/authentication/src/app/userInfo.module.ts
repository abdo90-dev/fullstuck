import { NgModule } from '@angular/core';

export const useInfo = 'This is shared data';

@NgModule({
  providers: [
    { provide: 'userInfo', useValue: useInfo }
  ]
})
export class SharedModule { }