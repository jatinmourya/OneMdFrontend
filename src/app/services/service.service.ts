import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  api = 'http://localhost:3000';

  postData(data: any) {
    return this.http.post(this.api + '/items', data);
  }

  getDatas() {
    return this.http.get(this.api + '/items');
  }

  deleteData(id: any) {
    return this.http.delete(this.api + '/items/' + id);
  }

  updateData(id: any, data: any) {
    return this.http.put(this.api + '/items/' + id, data);
  }

  getDataById(id: any) {
    return this.http.get(this.api + '/items/' + id);
  }
}
