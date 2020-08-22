import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
declare var swal, toastr;

@Injectable({
  providedIn: 'root'
})
export class FxGlobalsService {

  constructor(private spinner: NgxSpinnerService) { }

  public alertConfirm(title: string, text:  string, icon: string, buttons = ["Cancelar", "Aceptar"]): Promise<any> {
    return new Promise((resolve, reject) => {
      swal({
        title,
        text,
        icon,
        buttons,
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

  public showAlert(title: string, text: string, icon: string, time?: number) {
    
    setTimeout(() => {
      swal({
        title,
        text,
        icon
      });
    }, time || 0);
  }

  public showToast(text: string, method: string) {

    toastr.options = {
      "positionClass": "toast-right-center"
    };
    toastr.success(text);
  }

  public showSpinner = () => this.spinner.show();

  public hideSpinner = (time?: number) => 
    setTimeout(() => this.spinner.hide(), time || 0);
}
