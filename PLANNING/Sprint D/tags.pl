:-ensure_loaded("./bc_sprintB_rede_social.pl").

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

substitui_sinonimos(T,L):-
        substitui_sinonimos1(T,L1),
        reverse(L1,L).

substitui_sinonimos1([H|T],L):-
	substitui_sinonimos1(H,R),
	substitui_sinonimos1(T,L1),
	add_tail(L1,R,L).
	
substitui_sinonimos1(X,R):-
	sinonimo(R,X).

substitui_sinonimos1(X,X).

duplicate_list(L,L).

add_tail([],X,[X]).
add_tail([H|T],X,[H|L]):-add_tail(T,X,L).

lista_tags_sinonimos(L):-
	tags(L1),
	substitui_sinonimos(L1,L2),
	reverse(L2,L).
	%sort(L3,L).

user_tags(N,L):-
        no(N,_,L).

group_tags(N,L):-
        grupo(N,_,L).

subset([ ],_).
subset([H|T],List) :-
    member(H,List),
    subset(T,List).

inter([], _, []).

inter([H1|T1], L2, [H1|Res]) :-
    member(H1, L2),
    inter(T1, L2, Res).

inter([_|T1], L2, Res) :-
    inter(T1, L2, Res).