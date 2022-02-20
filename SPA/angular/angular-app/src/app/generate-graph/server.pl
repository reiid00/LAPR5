% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

%Cors
:- set_setting(http:cors, [*]).

:- dynamic nova_relacao/3.
:- dynamic ligacao/4.
:- dynamic no/3.

:-ensure_loaded("./caminho_mais_forte.pl").
:-ensure_loaded("./bc_sprintB_rede_social.pl").
:-ensure_loaded("./tamanho_da_rede.pl").
:-ensure_loaded("./sugerir_ligacoes.pl").
:-ensure_loaded("./tags.pl").

:-json_object objeto_json_tags(
    user1:string,
    user2: string,
    caminho:list(string)).

:-json_object objeto_json_rede(
    rede:list(string)
).

:-json_object objeto_json_tamanho_rede(
    size:string
).

% Criacao de servidor HTTP no porto 'Port'
server(Port) :-
    http_server(http_dispatch, [port(Port)]),
    cors_enable.

stop(Port):-
    http_stop_server(Port,_).

% Handlers
:- http_handler('/api/CaminhoMaisForte', caminhoForteHandler, []).
:- http_handler('/api/RedeUtilizador', redeUtilizadorHandler, []).
:- http_handler('/api/SugerirLigacoes', sugerirLigacoesHandler, []).

users_url("https://21s5df32app.azurewebsites.net/api/Utilizador/").
relacoes_url("https://21s5df32app.azurewebsites.net/api/Relation/").

sugerirLigacoesHandler(Request):-

    cors_enable,

    removerBaseConhecimento(),!,
    carregaDados(),!,
    consult("./bc_sprintB_rede_social.pl"), %dados de teste independentes da BD

    http_read_json(Request, JSON, [json_object(dict)]),
    User=JSON.userID,
    Nivel=JSON.nivel,
    NTags=JSON.nTags,

    atom_number(Nivel,Nivel1),
    atom_number(NTags,NTags1),

    sugerir_ligacoes(User,Nivel1,NTags1,R),

    prolog_to_json(objeto_json_rede(R),JSONObject),
    reply_json(JSONObject,[json_object(dict)]).


redeUtilizadorHandler(Request):-

    cors_enable,

    removerBaseConhecimento(),!,
    carregaDados(),!,
    consult("./bc_sprintB_rede_social.pl"), %dados de teste independentes da BD

    http_read_json(Request, JSON, [json_object(dict)]),
    User=JSON.userID,
    N=JSON.n,

    atom_number(N,N1),

    vizinhanca(N1,User,R),!,

    atom_string(R,R1),
    prolog_to_json(objeto_json_tamanho_rede(R1),JSONObject),
%    prolog_to_json(objeto_json_tamanho_rede(User,R),JSONObject),
    reply_json(JSONObject,[json_object(dict)]).

vizinhanca4(N,_,R):-
    R is N.

caminhoForteHandler(Request):-

    cors_enable,

    removerBaseConhecimento(),!,
    carregaDados(),!,
    consult("./bc_sprintB_rede_social.pl"), %dados de teste independentes da BD

    http_read_json(Request, JSON, [json_object(dict)]),
    Orig = JSON.origId,
    Dest = JSON.destId,
%    atom_number(Orig,Orig1),
%    atom_number(Dest,Dest1),
    
%    http_parameters(Request,
%        [origId(Orig,[string]),
%         destId(Dest,[string])
%         ]),
    plan_strlig(Orig,Dest,L),
    %append([9998],L,L2),
    %Reply = objeto_json_tags(Orig,Dest,L),
    prolog_to_json(objeto_json_rede(L),JSONObject),
    reply_json(JSONObject,[json_object(dict)]).

adicionaJogadores():-
    carregaJogadores(Data),
    parse_jogadores(Data).

carregaJogadores(Data) :-
    users_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Data),
        close(In)
).

parse_jogadores([]).
parse_jogadores([H|List]):-
    asserta(no(H.get(id),H.get(nome),H.get(tags))),
    parse_jogadores(List).

adicionaRelacoes():-
    carregaRelacoes(Data),
    parse_relacoes(Data).

carregaRelacoes(Data) :-
    relacoes_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Data),
        close(In)).

parse_relacoes([]).
parse_relacoes([H|List]):-
    asserta(nova_relacao(H.get(userID1),H.get(userID2),H.get(strength))),
    parse_relacoes(List).

carregaLigacoes([],[]).

carregaLigacoes([User1|Lista],[User2|Lista2]):-
    nova_relacao(User1,User2,Forca1),nova_relacao(User2,User1,Forca2),
    asserta(ligacao(User1,User2,Forca1,Forca2)),
    carregaLigacoes(Lista,Lista2).

adicionaLigacoes():- findall(Jogador1,nova_relacao(Jogador1,_,_),Lista),
                        findall(Jogador2, nova_relacao(_,Jogador2,_),Lista2),
                        carregaLigacoes(Lista,Lista2).

carregaDados():-
    adicionaJogadores(),
    adicionaRelacoes(),
    adicionaLigacoes().

removerBaseConhecimento():-
        retractall(no(_,_,_)),
        retractall(nova_relacao(_,_,_)),
        retractall(ligacao(_,_,_,_)).