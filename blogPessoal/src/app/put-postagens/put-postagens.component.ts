import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagens } from '../model/Postagens';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { PostagensService } from '../service/postagens.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-put-postagens',
  templateUrl: './put-postagens.component.html',
  styleUrls: ['./put-postagens.component.css']
})
export class PutPostagensComponent implements OnInit {

  postagens: Postagens = new Postagens();
  listaPostagens: Postagens[];
  idPost: number;

  tema: Tema = new Tema();
  listaTema: Tema[];
  idTema: number;

  constructor(
    private postagensService: PostagensService,
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.idPost = this.route.snapshot.params["id"];

    this.findByIdPostagens(this.idPost);
    this.findAllTema();
  }

  salvar() {
    this.tema.id = this.idTema;
    this.postagens.tema = this.tema;

    this.postagensService.putPostagens(this.postagens).subscribe(
      (resp: Postagens) => {
        this.postagens = resp;
        this.alert.showAlertSuccess("Seu post foi editado com sucesso! 👌");
        this.router.navigate(['/feed']);
      }, err => {
        if(err.status == '500')
          this.alert.showAlertDanger("✋ Você precisa preencher todos os campos corretamente antes de tentar salvar.");
      }
    );
  }

  btnNao(){
    this.alert.showAlertInfo("🏃‍♂️ Voltando para o feed...");
    this.router.navigate(['/feed']);
  }

  findByIdPostagens(id: number) {
    this.postagensService.getByIdPostagens(id).subscribe((resp: Postagens) => {
      this.postagens = resp;
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

}
