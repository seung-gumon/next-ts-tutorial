import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    (
        async () => {
            const response = await fetch('http://localhost:3000/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query: '{ users { name } }'}),
            });

            const json = await response.json();
        }
    )();


    return (
        <div className="container">
            <Head>
                <title>Next App With Apollo</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="title">
                    Next App With <span>Apollo</span>
                </h1>

                <Link href="/users">
                    <p className="description">
                        userList
                    </p>
                </Link>
            </main>
        </div>
    )
}






