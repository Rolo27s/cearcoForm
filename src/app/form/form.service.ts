import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private emailUrl = 'https://your-backend-api.com/send-email'; // URL de tu backend para enviar emails

  constructor(private http: HttpClient) { }

  sendForm(formData: any): Observable<any> {
    return this.http.post<any>(this.emailUrl, formData);
  }
}
