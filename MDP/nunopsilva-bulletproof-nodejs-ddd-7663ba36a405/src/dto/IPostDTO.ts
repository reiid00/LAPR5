export interface IPostDTO {
	id: string;
	texto: string;
	comentarios: string[];
	tags: string[];
	likes: number;
	dislikes: number;
	autorId: string;
	likesUsers: string[];
	dislikesUsers: string[];
}