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
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { pokemonBaseUrl } from "../../config/config";
import { getPokemonById, Pokemon } from "../../utils/getPokemon";

const PokemonPage: NextPage<Pokemon> = (pokemon?: Pokemon) => {
	return (
		<>
			<Head>
				<title>{pokemon?.name}</title>
				<meta name="description" content={pokemon?.name} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id;
	if (Array.isArray(id) || id === undefined) return { props: {} };

	const data = await getPokemonById(id);

	return {
		props: data,
	};
};

export default PokemonPage;
