import {useEffect, useState} from 'react';
import Link from 'next/link';
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";


const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});

export default function Users() {
    const [users, setUsers] = useState([]);

    (async function () {
        const { loading, error, data } = await client.query({
            query: gql`
                query users {
                    users {
                        id
                        name
                        color
                    }
                }
            `,
        });

        console.log(data , 'users')

    })();

    return (
        <div className="users-page">
            <ul>
                {
                    users.map((user) => {
                        const {id, name, color} = user;
                        return (
                            <Link href={`/users/${id}`} key={id}>
                                <li style={{color}}>
                                    {`${id}. ${name}(${color})`}
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    );
}