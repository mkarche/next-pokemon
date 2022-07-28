import { pokemonBaseUrl } from "../config/config";

export interface PokemonOverview {
	id: number;
	name: string;
	image: string;
}

export interface Pokemon {
	name: string;
	type: string[];
	stats: {
		name: string;
		value: string;
	}[];
	image: string;
}

export const getPokemon = async (): Promise<PokemonOverview[]> => {
	return await fetch(`${pokemonBaseUrl}index.json`).then((res) => res.json());
};

export const getPokemonById = async (id: string): Promise<Pokemon> => {
	return await fetch(`${pokemonBaseUrl}pokemon/${id}.json`).then(
		(res): Promise<Pokemon> => res.json()
	);
};
