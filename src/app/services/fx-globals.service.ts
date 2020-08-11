import { Injectable } from '@angular/core';
declare var swal;

@Injectable({
  providedIn: 'root'
})
export class FxGlobalsService {

  constructor() { }

  public alertConfirm(title: string, text:  string, icon: string): Promise<any> {
    return new Promise((resolve, reject) => {
      swal({
        title,
        text,
        icon,
        buttons: true,
        dangerMode: true,
      })
      .then((result) => {
        if(result) {
          resolve();
        }
        else {
          reject();
        }
      });
    });
  }
}
