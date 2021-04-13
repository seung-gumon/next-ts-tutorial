import {useRouter} from 'next/router';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {useState} from 'react';


interface IUser {
    id: number
    name: string
    color: string
}

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});

function UserDetail() {
    const router = useRouter();
    const [user, setUser] = useState<IUser>();

    (async function () {
        const {query: {_id: userId}} = router;
        if (!userId) {
            return;
        }


        //this is useQuery
        const {loading, error, data} = await client.query({
            query: gql`
                query user($userId: String!) {
                    user(id: $userId) {
                        _id
                        id
                        name
                        color
                    }
                }
            `,
            variables: {userId},
        });
        setUser(data.user);
    })();


    return (
        <div className="user-detail-page">
            <h1>User Detail</h1>
            {user ?
                (
                    <>
                        <h2>{user.name}</h2>
                        <p>아이디: {user.id}</p>
                        <p>색상: {user.color}</p>
                    </>
                ) : (
                    <div>Loading...</div>
                )
            }
        </div>
    );
}

export default UserDetail;