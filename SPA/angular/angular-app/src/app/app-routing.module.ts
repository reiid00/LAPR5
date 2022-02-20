import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { EstadohumorComponent } from './estadohumor/estadohumor.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoUserInterComponent } from './pedidos/pedido-user-inter/pedido-user-inter.component';
import { PedidoUserObjetivoComponent } from './pedidos/pedido-user-objetivo/pedido-user-objetivo.component';
import { CriarPedidoComponent } from './pedidos/criar-pedido/criar-pedido.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { GraphComponent } from './graph/graph.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {FortalezaRedeComponent} from './leaderboard/fortaleza-rede/fortaleza-rede.component';
import { ForcaLigacaoComponent } from './forca-ligacao/forca-ligacao.component';
import { MiniMapComponent } from './minimap/minimap.component';
import { RgpdTermsComponent } from './rgpd-terms/rgpd-terms.component';
import { TagCloudAllUsersComponent } from './tag-cloud-all-users/tag-cloud-all-users.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { PostComponent } from './post/post.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { UserNewConexionsComponent } from './user-new-conexions/user-new-conexions.component';
import { DimensaoRedeComponent } from './leaderboard/dimensao-rede/dimensao-rede.component';
import { TagsRelacoesProprioComponent } from './tags-relacoes-proprio/tags-relacoes-proprio.component';
import { TagsProprioComponent } from './tags-proprio/tags-proprio.component';
import { TagAllRelacoesComponent } from './tag-all-relacoes/tag-all-relacoes.component';
import { TagsOverallComponent } from './tags-overall/tags-overall.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  {path: 'estadohumor', component:EstadohumorComponent},
  {path: 'pedido',component:PedidosComponent, children : [
    {path:'userInter',component:PedidoUserInterComponent},  
    {path:'userObjetivo',component:PedidoUserObjetivoComponent},
    {path: 'criarPedido',component:CriarPedidoComponent},
  ]},
  {path: 'search-box', component:SearchBoxComponent},
  {path: 'user-profile/:id', component:UserProfileComponent},
  {path: 'graph', component:GraphComponent},
  {path : 'leaderboard',component:LeaderboardComponent, children : [
    {path:'fortalezaRede',component:FortalezaRedeComponent}, 
    {path:'dimensaoRede',component:DimensaoRedeComponent}, 
  ]},
  {path: 'forca-ligacao',component:ForcaLigacaoComponent},
  {path: 'minimap',component:MiniMapComponent},
  {path: 'rgpd-terms',component:RgpdTermsComponent},
  {path:'tags',component:TagsOverallComponent,children : [
    {path: 'tag-cloud-all-users',component:TagCloudAllUsersComponent},
    {path: 'tag-relacoes-proprio',component:TagsRelacoesProprioComponent},
    {path: 'tag-proprio',component:TagsProprioComponent},
    {path: 'tag-all-relacoes',component:TagAllRelacoesComponent},
  ]},
  {path: "post-feed", component: PostFeedComponent},
  {path: "post", component: PostComponent},
  {path: "comentario", component: ComentarioComponent},
  {path: "post-feed", component: PostFeedComponent},
  {path:"new-conexions",component:UserNewConexionsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
