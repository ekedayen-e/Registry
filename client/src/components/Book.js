import React, {useState, useEffect} from 'react'
import axios from 'axios'
const init = {
    "first_name": '',
    "last_name": '',
    "phone_number": '',
}


function Book() {
    const [data, setData] = useState(init);
    const [entries, setEntries] = useState([])

    const handleChange = (event, field) => {
        event.preventDefault();
        setData({...data ,
            [field]: event.target.value });
    }

    const getEntries = () => {
        axios.get('/api/entries')
        .then((res) => {
            if(res.data) {
                setEntries(res.data)
            }
        }).catch((err) => console.log(err))
    }

    const onSubmit = () => {
        const en = {
            ...data
        }
        axios.post('/api/entries', en)
        .then((res) => {
                getEntries();
                setData(init);
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getEntries();
    }, [])

  return (
    <div>
    <form>
    <legend>Customer Information</legend>
    <label for="fname"> Enter First Name: </label>
    <input required placeholder="John" type="text" id="fname" value={data.first_name} onChange={(e) => handleChange(e, "first_name")}/>
    <label for="lname"> Enter Last Name: </label>
    <input required placeholder="Doe" type="text" id="lname" value={data.last_name} onChange={(e) => handleChange(e, "last_name")}/>
    <label for="num"> Enter Phone Number: </label>
    <input required placeholder="123456789" type="number" id="num" value={data.phone_number} onChange={(e) => handleChange(e, "phone_number")}/>
    <button onClick={onSubmit}>Submit</button>
    </form>
    <ul>
    {entries.map((entry) => {
        return(
        <li key={entry._id}>
        <p>{entry.first_name} {entry.last_name} : {entry.phone_number}</p>
        </li>
        )
    }
    )}
    </ul>
    </div>
  )
}

export default Book