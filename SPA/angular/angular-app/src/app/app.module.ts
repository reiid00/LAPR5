import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UserSearchListComponent } from './user-search-list/user-search-list.component';
import { EstadohumorComponent } from './estadohumor/estadohumor.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


//mport { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { BoardUserComponent } from './board-user/board-user.component';
import { UtilizadorComponent } from './utilizador/utilizador.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { GraphComponent } from './graph/graph.component';
import { PedidoUserInterComponent } from './pedidos/pedido-user-inter/pedido-user-inter.component';
import { PedidoUserObjetivoComponent } from './pedidos/pedido-user-objetivo/pedido-user-objetivo.component';
import { CriarPedidoComponent } from './pedidos/criar-pedido/criar-pedido.component';
import { OnCreateDirective } from './on-create.directive';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FortalezaRedeComponent } from './leaderboard/fortaleza-rede/fortaleza-rede.component';
import { ForcaLigacaoComponent } from './forca-ligacao/forca-ligacao.component';
import { MiniMapComponent } from './minimap/minimap.component';
import { RgpdTermsComponent } from './rgpd-terms/rgpd-terms.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { TagCloudAllUsersComponent } from './tag-cloud-all-users/tag-cloud-all-users.component';
import {MatToolbarModule} from '@angular/material/toolbar';

import { PostComponent } from './post/post.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { SearchPostsFeedComponent } from './tools/search-posts-feed/search-posts-feed.component';

import { DimensaoRedeComponent } from './leaderboard/dimensao-rede/dimensao-rede.component';
import { UserNewConexionsComponent } from './user-new-conexions/user-new-conexions.component';
import { CreateComentarioComponent } from './tools/create-comentario/create-comentario.component';
import { ViewComentariosComponent } from './tools/view-comentarios/view-comentarios.component';
import { TagsOverallComponent } from './tags-overall/tags-overall.component';
import { TagsRelacoesProprioComponent } from './tags-relacoes-proprio/tags-relacoes-proprio.component';
import { TagsProprioComponent } from './tags-proprio/tags-proprio.component';
import { TagAllRelacoesComponent } from './tag-all-relacoes/tag-all-relacoes.component';


@NgModule({
  declarations: [
    AppComponent,
    PedidosComponent,
    UserSearchListComponent,
    EstadohumorComponent,
    LoginComponent,
    SearchBoxComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    UtilizadorComponent,
    GraphComponent,
    PedidoUserInterComponent,
    PedidoUserObjetivoComponent,
    CriarPedidoComponent,
    OnCreateDirective,
    UserProfileComponent,
    LeaderboardComponent,
    FortalezaRedeComponent,
    ForcaLigacaoComponent,
    MiniMapComponent,
    RgpdTermsComponent,
    TagCloudAllUsersComponent,
    PostComponent,
    ComentarioComponent,
    PostFeedComponent,
    CreatePostComponent,
    SearchPostsFeedComponent,
    DimensaoRedeComponent,
    UserNewConexionsComponent,
    CreateComentarioComponent,
    ViewComentariosComponent,
    TagsOverallComponent,
    TagsRelacoesProprioComponent,
    TagsProprioComponent,
    TagAllRelacoesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    TagCloudModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
