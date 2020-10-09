import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Postagens } from '../model/Postagens';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostagensService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  };

  getAllPostagens() {
    return this.http.get('http://localhost:8080/postagens', this.token);
  }

  getByIdPostagens(id: number) {
    return this.http.get(`http://localhost:8080/postagens/${id}`, this.token);
  }

  getByTituloPostagens(titulo: string) {
    return this.http.get(`http://localhost:8080/postagens/titulo/${titulo}`, this.token);
  }

  postPostagens(postagem: Postagens) {
    return this.http.post('http://localhost:8080/postagens', postagem, this.token);
  }

  putPostagens(postagem: Postagens) {
    return this.http.put('http://localhost:8080/postagens', postagem, this.token);
  }

  deleteByIdPostagens(id: number) {
    return this.http.delete(`http://localhost:8080/postagens/${id}`, this.token);
  }
}
