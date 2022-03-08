import { useEffect, useState } from 'react';

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    const fetchValues = async () => {
        const values = await fetch('/api/values/current');
        const json = await values.json();
        setValues(json);


    };

    const fetchIndexes = async () => {
        const seenIndexes = await fetch('/api/values/all');
        const json = await seenIndexes.json();
        setSeenIndexes(json);
    };

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ num }) => num).join(', ');
    }

    const renderValues = () => {
        const entries = [];
        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            )
        }

        return entries;
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(index);

        const data = await fetch('/api/values', {
            headers: {
                "Accept": "application/json",
                "Content-Type" : "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                index: index
            })
        });
        console.log(data.ok);
        setIndex('');
    }

    useEffect(() => {
        
        (async () => {
            await Promise.all([
                await fetchValues(),
                await fetchIndexes(),
            ]);
        })();
    
    }, []);

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Enter Your Index :</label>
                <input
                    type='number'
                    value={index}
                    onChange={event => {
                        setIndex(event.target.value);
                    }}
                />
                <button>submit</button>
            </form>

            <h3>Indexes I Have seen :</h3>
            {renderSeenIndexes()}

            <h3>Calculated Values :</h3>
            <div>
                {renderValues()}
            </div>
        </div>
    )
}

export default Fib;