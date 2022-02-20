:-consult('bc_sprintB_rede_social').

caminho(A,B,Path,Len) :-
       atravessa(A,B,[A],Q,Len),
       reverse(Q,Path).

atravessa(A,B,P,[B|P],L) :-
        L is 1,
        no(NumA,A,_),
        no(NumB,B,_),
       ligacao(NumA,NumB,_,_).

atravessa(A,B,Visited,Path,L) :-
        no(NumA,A,_),
       ligacao(NumA,C,_,_),
       no(C,NomeC,_),
       NomeC \== B,
       \+member(NomeC,Visited),
       atravessa(NomeC,B,[NomeC|Visited],Path,L1),L is L1+1.


mais_Curto(A,B,Path,Length) :-
   setof([P,L],caminho(A,B,P,L),Set),
   Set = [_|_], % fail if empty
   minimo(Set,[Path,Length]).

minimo([F|R],M) :- min(R,F,M).

% minimo caminho
min([],M,M).
min([[P,L]|R],[_,M],Min) :- L < M, !, min(R,[P,L],Min).
min([_|R],M,Min) :- min(R,M,Min).


