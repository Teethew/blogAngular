import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Postagens } from '../model/Postagens';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css']
})
export class PostTemaComponent implements OnInit {

  tema: Tema = new Tema();
  listaTema: Tema[];
  
  constructor(
    private temaService: TemaService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit(): void {
    this.findAllTema();
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.tema.id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  cadastrar() {
    if(this.tema.descricao.match(/^(\s)+$/) || this.tema.descricao.length == 0) //essa regExp testa se o texto está vazio (ou somente com espaços)
      this.alert.showAlertWarning('Você precisa dizer o nome do tema, oras 🤨'); 
    else
      this.temaService.postTema(this.tema).subscribe(
        (resp: Tema) => {
          this.tema = resp;
          this.tema = new Tema();
          //this.router.navigate(['/feed']);
          this.alert.showAlertSuccess('Seu tema foi cadastrado com sucesso 🤝');
          this.findAllTema();
        }, err => {
          if(err.status == '500')
            this.alert.showAlertWarning("Esse nome tá muito pequeno. 🤏");
        })
    
  }

}
