import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DeletePostagensComponent } from './delete-postagens/delete-postagens.component';
import { DeleteTemaComponent } from './delete-tema/delete-tema.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostTemaComponent } from './post-tema/post-tema.component';
import { PutPostagensComponent } from './put-postagens/put-postagens.component';
import { PutTemaComponent } from './put-tema/put-tema.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'cadastro-tema', component: PostTemaComponent},
  {path: 'editar-postagens/:id', component: PutPostagensComponent},
  {path: 'editar-tema/:id', component: PutTemaComponent},
  {path: 'apagar-postagens/:id', component: DeletePostagensComponent},
  {path: 'apagar-tema/:id', component: DeleteTemaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
