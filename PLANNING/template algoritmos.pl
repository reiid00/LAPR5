% Base de Conhecimento

% Bibliotecas JSON
:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).

% Biblioteca WordNet

no(1,ana,[natureza,pintura,musica,sw,porto]).
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,musica,carros,porto,moda]).
%no(13,carlos,[natureza,musica,sw,futebol,coimbra]).
%no(14,daniel,[natureza,cinema,jogos,sw,moda]).
no(21,eduardo,[natureza,cinema,teatro,carros,coimbra]).
no(22,isabel,[natureza,musica,porto,lisboa,cinema]).
%no(23,jose,[natureza,pintura,sw,musica,carros,lisboa]).
%no(24,luisa,[natureza,cinema,jogos,moda,porto]).
no(31,maria,[natureza,pintura,musica,moda,porto]).
no(32,anabela,[natureza,cinema,musica,tecnologia,porto]).
%no(33,andre,[natureza,carros,futebol,coimbra]).
%no(34,catia,[natureza,musica,cinema,lisboa,moda]).
no(41,cesar,[natureza,teatro,tecnologia,futebol,porto]).
no(42,diogo,[natureza,futebol,sw,jogos,porto]).
%no(43,ernesto,[natureza,teatro,carros,porto]).
%no(44,isaura,[natureza,moda,tecnologia,cinema]).
no(200,sara,[natureza,moda,musica,sw,coimbra]).

%no(51,rodolfo,[natureza,musica,sw]).
%no(61,rita,[moda,tecnologia,cinema]).


ligacao(1,11,10,8).
ligacao(1,12,2,6).
%ligacao(1,13,-3,-2).
%ligacao(1,14,1,-5).
ligacao(11,21,5,7).
ligacao(11,22,2,-4).
%ligacao(11,23,-2,8).
%ligacao(11,24,6,0).
ligacao(12,21,4,9).
ligacao(12,22,-3,-8).
%ligacao(12,23,2,4).
%ligacao(12,24,-2,4).
%ligacao(13,21,3,2).
%ligacao(13,22,0,-3).
%ligacao(13,23,5,9).
%ligacao(13,24,-2, 4).
%ligacao(14,21,2,6).
%ligacao(14,22,6,-3).
%ligacao(14,23,7,0).
%ligacao(14,24,2,2).
ligacao(21,31,2,1).
ligacao(21,32,-2,3).
%ligacao(21,33,3,5).
%ligacao(21,34,4,2).
ligacao(22,31,5,-4).
ligacao(22,32,-1,6).
%ligacao(22,33,2,1).
%ligacao(22,34,2,3).
%ligacao(23,31,4,-3).
%ligacao(23,32,3,5).
%ligacao(23,33,4,1).
%ligacao(23,34,-2,-3).
%ligacao(24,31,1,-5).
%ligacao(24,32,1,0).
%ligacao(24,33,3,-1).
%ligacao(24,34,-1,5).
ligacao(31,41,2,4).
ligacao(31,42,6,3).
%ligacao(31,43,2,1).
%ligacao(31,44,2,1).
ligacao(32,41,2,3).
ligacao(32,42,-1,0).
%ligacao(32,43,0,1).
%ligacao(32,44,1,2).
%ligacao(33,41,4,-1).
%ligacao(33,42,-1,3).
%ligacao(33,43,7,2).
%ligacao(33,44,5,-3).
%ligacao(34,41,3,2).
%ligacao(34,42,1,-1).
%igacao(34,43,2,4).
%ligacao(34,44,1,-2).
ligacao(41,200,2,0).
ligacao(42,200,7,-2).
%ligacao(43,200,-2,4).
%ligacao(44,200,-1,-3).

%ligacao(1,51,6,2).
%ligacao(51,61,7,3).
%igacao(61,200,2,4).


:-dynamic melhor_sol_minlig/2.

all_dfs(Nome1,Nome2,LCam):-get_time(T1),
    findall(Cam,dfs(Nome1,Nome2,Cam),LCam),
    length(LCam,NLCam),
    get_time(T2),
    write(NLCam),write(' solucoes encontradas em '),
    T is T2-T1,write(T),write(' segundos'),nl,
    write('Lista de Caminhos possiveis: '),write(LCam),nl,nl.

dfs(Orig,Dest,Cam):-dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam):-no(NAct,Act,_),(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],Cam).


plan_minlig(Orig,Dest,LCaminho_minlig):-
		get_time(Ti),
		(melhor_caminho_minlig(Orig,Dest);true),
		retract(melhor_sol_minlig(LCaminho_minlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_minlig(Orig,Dest):-
		asserta(melhor_sol_minlig(_,10000)),
		dfs(Orig,Dest,LCaminho),
		atualiza_melhor_minlig(LCaminho),
		fail.

atualiza_melhor_minlig(LCaminho):-
		melhor_sol_minlig(_,N),
		length(LCaminho,C),
		C<N,retract(melhor_sol_minlig(_,_)),
		asserta(melhor_sol_minlig(LCaminho,C)).

:-dynamic melhor_sol_strlig/2.

plan_strlig(Orig,Dest,LCaminho_strlig):-
    	get_time(Ti),
		(melhor_caminho_strlig(Orig,Dest);true),
		retract(melhor_sol_strlig(LCaminho_strlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_strlig(Orig,Dest):-
		asserta(melhor_sol_strlig(_,-10000)),
		dfs(Orig,Dest,LCaminho),
		atualiza_melhor_strlig(LCaminho),
		fail.

atualiza_melhor_strlig(LCaminho):-
		melhor_sol_strlig(_,N),
		forca(LCaminho,S),
		length(LCaminho,Q),
		R is S/Q,
		R>N,retract(melhor_sol_strlig(_,_)),
		asserta(melhor_sol_strlig(LCaminho,R)).

forca(X,Y,S):-
		no(N,X,_),
		%member(P,Y),
		%no(M,P,_),
		no(M,Y,_),
		ligacao(N,M,S,_).
forca([X,Y],S):-
		forca(X,Y,S).
%forca([X|Y],S):-
%		length([X|Y],2),
%		forca(X,Y,S).
forca([X|Y],S):-
		forca(Y,S1),
		list_head(Y,E),
		forca(X,E,S2),
		S is S1+S2.

list_head([X|_],X).


/*
Caminho mais seguro com força limiar determinada pelo utilizador, neste metodo temos 
a determinação do caminho com maior força média no menor número de ligações, sendo 
que devemos ter uma limiar determinada pelo utilizado, não devendo nenhuma das ligações 
entre dois nós ser menor que essa limiar
*/

:-dynamic melhor_sol_strlig2/2.

plan_strlig2(Orig,Dest,L,LCaminho_strlig):-
    	get_time(Ti),
		(melhor_caminho_strlig2(Orig,Dest,L);true),
		retract(melhor_sol_strlig2(LCaminho_strlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_strlig2(Orig,Dest,L):-
		asserta(melhor_sol_strlig2(_,-10000)),
		dfs(Orig,Dest,LCaminho),
		atualiza_melhor_strlig2(LCaminho,L),
		fail.

atualiza_melhor_strlig2(LCaminho,L):-
		melhor_sol_strlig2(_,N),
		forca2(LCaminho,L,S,S2),
		length(LCaminho,Q),
		R is S/Q,
		R>N,retract(melhor_sol_strlig2(_,_)),
		asserta(melhor_sol_strlig2(LCaminho,R)).
		
forca2(X,Y,L,S1,S2):-
		no(N,X,_),
		no(M,Y,_),
		ligacao(N,M,S1,S2).

forca2([X,Y],L,S1,S2):-
		forca2(X,Y,L,S1,S2).

forca2([X|Y],L,S1,S2):-
		forca2(Y,L,F,P),
		F>L-1,
		P>L-1,
		list_head(Y,E),
		forca2(X,E,L,Q,N),
		Q>L-1,
		N>L-1,
		S1 is F+Q,
		S2 is P+N.


/*
Obter os utilizadores que tenham em comum Xtags sendo X parametrizável.
Deve ter em atenção que duas tags sintaticamente diferentes podem ter
o mesmo significado semântico (e.g. C# e CSharp).
*/

tag(natureza).
tag(pintura).
tag(arte).
tag(carros).
tag(futebol).
tag(desporto).
tag(moda).
tag(sw).
tag(tecnologia).
tag(teatro).
tag(jogos).
tag(porto).
tag(lisboa).
tag(coimbra).
tag(cinema).
tag(filmes).
tag(musica).

sinonimo(arte,pintura).
sinonimo(arte,musica).
sinonimo(desporto,futebol).
sinonimo(cinema,filmes).

tags(L):-
	findall(X, tag(X), L).

substitui_sinonimos([H|T],L):-
	(substitui_sinonimos(H,R);true),
	substitui_sinonimos(T,L2),
	add_tail(L2,R,L).
	
substitui_sinonimos(X,R):-
	sinonimo(R,X).

substitui_sinonimos(X,X).

duplicate_list(L,L).

empty([]).

add_tail([],X,[X]).
add_tail([H|T],X,[H|L]):-add_tail(T,X,L).

lista_tags_sinonimos(L,L4):-
	tags(L),
	substitui_sinonimos(L,L2),
	reverse(L2,L3),
	sort(L3,L4).

todas_combinacoes(X,LTags,LcombXTags):-
	findall(L,combinacao(X,LTags,L),LcombXTags).

combinacao(0,_,[]):-!.
combinacao(X,[Tag|L],[Tag|T]):-
	X1 is X-1,
	combinacao(X1,L,T).
combinacao(X,[_|L],T):- 
	combinacao(X,L,T).


x_tags_comum(X,[],[_],[],[_]).

x_tags_comum(X,[],[]).

x_tags_comum(X,L,L5):-
	lista_tags_sinonimos(L1,Ltags),
	todas_combinacoes(X,Ltags,LcombXTags),
	lists(LcombXTags,L2),
	no(N,_,L3),
	inter(L3,L2,L4),
	length(L4,Res),
	Res>=X,
	tags_utilizador(N,[],L,L4,[],L5),
	x_tags_comum(X,L,L5,L6,L7),
	L is L6,
	L5 is L7.
	

x_tags_comum(X,L,L5,L6,L7):-
	lista_tags_sinonimos(L1,Ltags),
	todas_combinacoes(X,Ltags,LcombXTags),
	lists(LcombXTags,L2),
	no(N,_,L3),
	inter(L3,L2,L4),
	length(L4,Res),
	Res>=X,
	tags_utilizador(N,L,L6,L4,L5,L7),
	x_tags_comum(X,L,L5,L6,L7).


inter([], _, []).

inter([H1|T1], L2, [H1|Res]) :-
    member(H1, L2),
    inter(T1, L2, Res).

inter([_|T1], L2, Res) :-
    inter(T1, L2, Res).


lists([], []).

lists([[Head|_]|Lists], [Head|L]):-
	lists(Lists, L).

lists([[_,Head|Tail]|Lists], L):-
	lists([[Head|Tail]|Lists], L).


create_list(Item, [], [Item]).

create_list(Item, List, ListaRes):-
	append([Item],List,ListaRes).

tags_utilizador(_,[],[_],[],[_],[_]).

tags_utilizador(N,L,L1,L2,L3,L4):-
	create_list(N,L,L1),
	create_list(L2,L3,L4).