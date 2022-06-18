import { Hash } from 'crypto';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

interface DataResponse {
	data: {
		artists: {
			items: [{}];
		};
	};
}

const Home: NextPage = () => {
	const [token, setToken] = useState('');
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const hash = window.location.hash;
		let token: string | undefined | null =
			window.localStorage.getItem('token');
		if (!token && hash) {
			token = hash
				.substring(1)
				.split('&')
				.find((e) => e.startsWith('access_token'))
				?.split('=')[1];
			window.location.hash = '';
			window.localStorage.setItem('token', token!);
		}
		setToken(token!);
	}, []);

	const logOut = () => {
		setToken('');
		window.localStorage.removeItem('token');
	};

	const searchArtists = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { data }: DataResponse = await axios.get(
			'https://api.spotify.com/v1/search',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					q: inputValue,
					type: 'artist',
				},
			}
		);
		console.log(data.artists.items[0]);
	};

	return (
		<div>
			{token ? (
				<button onClick={logOut}>Log out</button>
			) : (
				<Link
					href={`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=${process.env.NEXT_PUBLIC_RESPONSE_TYPE}`}
				>
					Log in
				</Link>
			)}
			{token && (
				<form onSubmit={searchArtists}>
					<input onChange={(e) => setInputValue(e.target.value)} />
					<button type='submit'>search</button>
				</form>
			)}
		</div>
	);
};

// export const getServerSideProps: GetServerSideProps = (context) => {
// 	return {
// 		props: context,
// 	};
// };

export default Home;
