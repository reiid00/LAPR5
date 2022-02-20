:-ensure_loaded("./bc_sprintB_rede_social.pl").
:-ensure_loaded("./tags.pl").
:-ensure_loaded("./subrede.pl").

sugerir_ligacoes(User,Nivel,N_tags,R):-
        subrede(Nivel,User,L),
        flatten(L,L1),
        x_tags1(User,N_tags,L1,R).

x_tags(N,X,L):-                 % ENCONTRA USERS COM X TAGS EM COMUM NO SISTEMA
        user_tags(N,Tags),
        substitui_sinonimos(Tags,STags),
        findall(User,
        (no(User,_,_),User \= N,
        user_tags(User,Tags2),
        substitui_sinonimos(Tags2,STags2),
        inter(STags,STags2,RL),
        sort(RL,RL2),
        length(RL2,R),R>=X),
        L1),
        sort(L1,L).

x_tags1(N,X,Lista,L):-          % ENCONTRA USERS COM X TAGS EM COMUM NUMA LISTA
        user_tags(N,Tags),
        substitui_sinonimos(Tags,STags),
        findall(User,
        (no(User,_,_),User \= N,member(User,Lista),
        user_tags(User,Tags2),
        substitui_sinonimos(Tags2,STags2),
        inter(STags,STags2,RL),
        sort(RL,RL2),
        length(RL2,R),R>=X),
        L1),
        sort(L1,L).