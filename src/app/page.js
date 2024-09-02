"use client";

import Head from 'next/head';
import Search from '../components/Search';
import { useState } from 'react';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Head>
                <title>Microsoft Resource Teacher</title>
                <meta name="description" content="Microsoft Resource Hub" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Search initialQuery={searchQuery} />
            </main>
        </div>
    );
}