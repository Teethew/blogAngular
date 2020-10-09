import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagens } from '../model/Postagens'
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { PostagensService } from '../service/postagens.service'
import { TemaService } from '../service/tema.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  postagens: Postagens = new Postagens();
  listaPostagens: Postagens[];
  titulo: string;

  tema: Tema = new Tema();
  listaTema: Tema[];
  idTema: number;
  nomeTema: string;

  constructor(
    private postagensService: PostagensService,
    private temaService: TemaService,
    private alert: AlertasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);

    let token = environment.token;

    if(!token) {
      this.router.navigate(['/login']);
      this.alert.showAlertDanger("Você precisa estar logado para visualizar o feed. 🕵️‍♂️");
    }

    this.findAllPostagens();
    this.findAllTema();
  }

  findAllPostagens() {
    this.postagensService.getAllPostagens().subscribe((resp: Postagens[]) => {
      this.listaPostagens = resp; 
    });
  }

  findByTituloPostagens() {
    if(this.titulo.match(/^(\s)+$/) || this.titulo.length == 0)
      this.findAllPostagens();
    else
      this.postagensService.getByTituloPostagens(this.titulo).subscribe((resp: Postagens[]) => {
        this.listaPostagens = resp;
      });
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findByDescricaoTema() {
    //o match está usando uma expressão regular que verifica se não há somente espaços no campo
    if (this.nomeTema.match(/^(\s)+$/) || this.nomeTema.length == 0)
      this.findAllTema();
    else
      this.temaService.getByDescricaoTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTema = resp;
      });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagens.tema = this.tema;

    if(!(this.postagens.titulo && this.postagens.tema && this.postagens.texto))
      this.alert.showAlertWarning("Você precisa preencher todos os campos para poder postar... 😒");
    else
      this.postagensService.postPostagens(this.postagens).subscribe((resp: Postagens) => {
        this.postagens = resp;
        this.postagens = new Postagens();
        this.alert.showAlertSuccess("Seu post foi publicado com sucesso! 👏");
        this.findAllPostagens();
      }) 
  }

}
