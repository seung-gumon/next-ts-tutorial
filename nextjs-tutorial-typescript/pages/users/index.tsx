import {useState} from 'react';
import Link from 'next/link';
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";


const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});

const Users = ({}) => {
    const [users, setUsers] = useState([]);


    (async () => {
        const {loading, error, data} = await client.query({
            query: gql`
                query users {
                    users {
                        _id
                        name
                        color
                    }
                }
            `,
        });
        setUsers(() => data.users)
    })();


    return (
        <div className="users-page">
            <ul>
                {
                    users?.map((user) => {
                        const {name, color, _id} = user;
                        return (
                            <Link href={`/users/${_id}`} key={_id}>
                                <li style={{color}}>
                                    {`${_id} . ${name}(${color})`}
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default Users