import {
	HStack,
	Image,
	Link,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pokemonBaseUrl } from "../../config/config";
import {
	getPokemonById,
	Pokemon,
	PokemonOverview,
} from "../../utils/getPokemon";

const PokemonPage: NextPage = () => {
	const {
		query: { id },
	} = useRouter();

	// const { data, isLoading, isError } = useQuery(["singlePokemon"], async () => {
	//     if (Array.isArray(id) || id === undefined) return;
	// 	return await getPokemonById(id);
	// });

	const [data, setData] = useState<Pokemon | PokemonOverview[] | undefined>(
		undefined
	);
	useEffect(() => {
		const getData = async () => {
			if (Array.isArray(id) || id === undefined) return;
			const res = await getPokemonById(id);
			setData(res);
		};
		if (id) {
			getData();
		}
	}, [id]);

	const pokemon = data && !Array.isArray(data) ? data : undefined;

	return (
		<>
			<Head>
				<title>{pokemon?.name}</title>
				<meta name="description" content={pokemon?.name} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* {isLoading && <div>Loading...</div>}
			{isError && <div>An Error Occurred</div>} */}
			{pokemon && (
				<HStack>
					<VStack p="2rem" alignItems="flex-start">
						<Link color="blue" href="/">
							Back Home
						</Link>
						<Image
							src={pokemonBaseUrl + pokemon.image}
							width="20rem"
							height="20rem"
							objectFit="fill"
						/>
					</VStack>
					<VStack alignItems="flex-start">
						<Text fontSize="3xl" fontWeight="bold">
							{pokemon.name}
						</Text>
						<HStack>
							<Text>{pokemon.type.join(",")},</Text>
						</HStack>
						<TableContainer>
							<Table variant="simple" size="sm">
								<Thead>
									<Tr>
										<Th>Name</Th>
										<Th>Value</Th>
									</Tr>
								</Thead>
								<Tbody>
									{pokemon.stats.map((stat) => (
										<Tr key={stat.name}>
											<Td fontSize="xs">{stat.name}</Td>
											<Td fontSize="xs">{stat.value}</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</VStack>
				</HStack>
			)}
		</>
	);
};

export default PokemonPage;
