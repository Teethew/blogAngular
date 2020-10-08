import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagens } from '../model/Postagens';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-delete-tema',
  templateUrl: './delete-tema.component.html',
  styleUrls: ['./delete-tema.component.css']
})
export class DeleteTemaComponent implements OnInit {

  /*postagens: Postagens = new Postagens();
  listaPostagens: Postagens[];
  idPost: number;*/

  tema: Tema = new Tema();
  listaTema: Tema[];
  idTema: number;

  constructor(
    //private postagensService: PostagensService,
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    let id = this.route.snapshot.params["id"];

    this.findByIdTema(id);
  }

  btnSim(){
    this.temaService.deleteByIdTema(this.tema.id).subscribe( () => {
      alert("Seu tema foi por água abaixo 🚽");
      this.router.navigate(['/cadastro-tema']);
    });
  }

  btnNao(){
    alert("🚙 De volta aos temas...");
    this.router.navigate(['/cadastro-tema']);
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

}
