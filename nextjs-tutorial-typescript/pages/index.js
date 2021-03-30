
export default function Home() {
    (
        async () => {
            const response = await fetch('http://localhost:3000/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: '{ users { name } }' }),
            });
            const json = await response.json();
            console.log( json );
        }
    )();


    return (
        <div className={'container'}>
            <span>헬로</span>
        </div>
    )
}


