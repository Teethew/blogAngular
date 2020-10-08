import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from '../service/alertas.service';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';
//import { DOCUMENT } from '@angular/common'

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
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];

    this.findByIdTema(id);
  }

  salvar() {
    if(!this.tema.descricao.match(/^(\s)+$/))
      this.temaService.putTema(this.tema).subscribe(
        (resp: Tema) => {
          this.tema = resp;
          this.alert.showAlertSuccess("Seu tema foi editado com sucesso! 👌");
          this.router.navigate(['/feed']);
        }, err => {
          if(err.status == '500' || err.status == '400')
            this.alert.showAlertDanger("✋ Você precisa preencher pelo menos o novo nome corretamente antes de salvar.");
        }
      );
    else
      this.alert.showAlertDanger("✋ Você precisa preencher pelo menos o novo nome corretamente antes de salvar.");
  }

  btnNao(){
    this.alert.showAlertInfo("🏃‍♂️ Voltando para o feed...");
    this.router.navigate(['/feed']);
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

}
