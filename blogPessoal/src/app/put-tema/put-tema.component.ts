import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-put-tema',
  templateUrl: './put-tema.component.html',
  styleUrls: ['./put-tema.component.css']
})
export class PutTemaComponent implements OnInit {

  tema: Tema = new Tema();


  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];

    this.findByIdTema(id);
  }

  salvar() {
    this.temaService.putTema(this.tema).subscribe(
      (resp: Tema) => {
        this.tema = resp;
        alert("Seu tema foi editado com sucesso! 👌");
        this.router.navigate(['/feed']);
      }, err => {
        if(err.status == '500' || err.status == '400')
          alert("✋ Você precisa preencher pelo menos o novo nome corretamente antes de salvar.");
      }
    );
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

}
