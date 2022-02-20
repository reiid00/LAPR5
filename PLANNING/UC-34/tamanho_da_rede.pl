:-consult('bc_sprintB_rede_social').

vizinhanca(N,E,R):-
    vizinhanca2(N,E,L),
    flatten(L, L1),
    tamanho_lista(L1,R).

vizinhanca2(N,E,L):-
    N>0,
    findall(Y,ligacao(E,Y,_,_),L2), %encontra ligacoes diretas de E, guarda em L2
    N2 is N-1,
    maplist(vizinhanca2(N2),L2,L3), %chama predicado para cada elemento de L2, guarda em L3
    addToList(L2,L3,L4), %concatena L2 e L3
    sort(L4,L5), %remove elementos repetidos
    exclude(empty,L5,L). %remove elementos vazios

vizinhanca2(0,_,[]).

atl(_, [], []).
atl(List, [H|T], R) :-
(  member(H, List)
-> R = Res
;  R = [H|Res]
),
atl(List, T, Res).
addToList(A, B, L) :-
atl(A, B, R),
append(A, R, L).

empty([]).


tamanho_lista(LIST,LENGTH) :- tamanho_lista(LIST,0,LENGTH) .

tamanho_lista( []     , LENGTH , LENGTH ):-!.



tamanho_lista( [_|LIST] , T , LENGTH ) :- T1 is T+1,
   tamanho_lista(LIST,T1,LENGTH).
