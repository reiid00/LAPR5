:-ensure_loaded("./bc_sprintB_rede_social.pl").

:-dynamic melhor_sol_strlig/2.

dfs(Orig,Dest,Cam,Max):-dfs2(Orig,Dest,[Orig],Cam), length(Cam,N), N=<Max.

dfs2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam):-(ligacao(Act,NX,_,_);ligacao(NX,Act,_,_)),
    \+ member(NX,LA),dfs2(NX,Dest,[NX|LA],Cam).

plan_strlig(Orig,Dest,LCaminho_strlig,Max):-
    	get_time(Ti),
		(melhor_caminho_strlig(Orig,Dest,Max);true),
		retract(melhor_sol_strlig(LCaminho_strlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_strlig(Orig,Dest,Max):-
		asserta(melhor_sol_strlig(_,-10000)),
		dfs(Orig,Dest,LCaminho,Max),
		atualiza_melhor_strlig(LCaminho),
		fail.

atualiza_melhor_strlig(LCaminho):-
		melhor_sol_strlig(_,N),
		forca(LCaminho,S),
		S>N,retract(melhor_sol_strlig(_,_)),
		asserta(melhor_sol_strlig(LCaminho,S)).

forca(X,Y,S):-
		ligacao(X,Y,S,_);ligacao(Y,X,S,_).
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