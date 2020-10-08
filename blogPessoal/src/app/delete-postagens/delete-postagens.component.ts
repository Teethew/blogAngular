import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagens } from '../model/Postagens';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { PostagensService } from '../service/postagens.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-delete-postagens',
  templateUrl: './delete-postagens.component.html',
  styleUrls: ['./delete-postagens.component.css']
})
export class DeletePostagensComponent implements OnInit {

  postagens: Postagens = new Postagens();
  listaPostagens: Postagens[];
  idPost: number;

  /*tema: Tema = new Tema();
  listaTema: Tema[];
  idTema: number;*/

  constructor(
    private postagensService: PostagensService,
    //private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    let id = this.route.snapshot.params["id"];

    this.findByIdPostagens(id);
  }

  btnSim(){
    this.postagensService.deleteByIdPostagens(this.postagens.id).subscribe( () => {
      this.alert.showAlertSuccess("Sua postagem foi ejetada 👨‍🚀");
      this.router.navigate(['/feed']);
    });
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

}
