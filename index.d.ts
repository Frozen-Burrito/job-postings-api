// Type declarations for trabajos-api 0.1.0
// Project: trabajos-api
// Definitions by: Frozen Burrito <https://github.com/Frozen-Burrito>

export as namespace jobOffersModels;

/*~ You can declare the types that will be available when importing the module */
export interface IUser {
	email: string;
	username: string;
	password: string;
	role: number;
    lastLogin: Date;
	createdAt: Date;
}