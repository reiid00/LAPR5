:-ensure_loaded("./bc_sprintB_rede_social.pl").
:-ensure_loaded("./tags.pl").

sugerir_maior_grupo(N,X,U,R):-
    sugerir_grupos(N,X,L),
    filter_grupos(L,U,L1),
    find_maior_grupo(L1,R).

filter_grupos(L,N,R):-
    findall(G,
    (grupo(G,_,_),
    group_users(G,U),
    length(U,N1),
    N1>=N,
    member(G,L)),
    R).

find_maior_grupo(Groups,G):-
    group_users(G,L),
    member(G,Groups),
    length(L,R),
    \+ (group_users(G1,L1), member(G1,Groups), length(L1,R1), R1 > R).

sugerir_grupos(N,X,L):-     % testar com sugerir_grupos(11,1,L): retorna o grupo do porto e do benfica porque ambos
    x_tags_grupos(N,X,L).   %                                       estao relacionados com desporto

sugerir_grupos1(N,X,L,Tags):- % testar com sugerir_grupos1(11,1,L,[lisboa]): retorna o grupo do benfica porque
    x_tags_grupos1(N,X,L,Tags). %                                               a tag lisboa e obrigatoria        

x_tags_grupos(N,X,L):-              % L = GRUPOS COM X TAGS EM COMUM COM USER N
        user_tags(N,Tags),
        substitui_sinonimos(Tags,STags),
        findall(Group,
        (grupo(Group,_,_),
        group_tags(Group,Tags2),
        substitui_sinonimos(Tags2,STags2),
        inter(STags,STags2,RL),
        sort(RL,RL2),
        length(RL2,R),R>=X),
        L1),
        sort(L1,L).

x_tags_grupos1(N,X,L,TagsG):-       % L = GRUPOS COM X TAGS EM COMUM COM USER N E COM TagsG OBRIGATORIAS
        user_tags(N,Tags),
        substitui_sinonimos(Tags,STags),
        findall(Group,
        (grupo(Group,_,_),
        group_tags(Group,Tags2),
        substitui_sinonimos(Tags2,STags2),
        inter(STags,STags2,RL),
        sort(RL,RL2),
        length(RL2,R),R>=X,
        subset(TagsG,Tags2)),       % VERIFICA SE AS TAGS OBRIGATORIAS ESTAO PRESENTES NA LISTA DE TAGS DO GRUPO
        L1),
        sort(L1,L).