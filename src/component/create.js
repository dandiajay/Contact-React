import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Create = () => {
    const baseUrl = "http://localhost:3000/contact"; // Assuming your users are stored at this endpoint

    const navigate = useNavigate();

    const [enteredFirstName, setenteredFirstName] = useState('');
    const [enteredLastName, setenteredLastName] = useState('');
    const [enteredPhoneNo, setenteredPhoneNo] = useState('');
    const [enteredEmail, setenteredEmail] = useState('');
    const [enteredState, setenteredState] = useState('');
    const [enteredZipCode, setenteredZipCode] = useState('');
    const FirstNameChangeHandler = (e) => {
        setenteredFirstName(e.target.value);
    }
    const LastNameChangeHandler = (e) => {
        setenteredLastName(e.target.value);
    }
    const PhoneNoChangeHandler = (e) => {
        setenteredPhoneNo(e.target.value);
    }

    const EmailChangeHandler = (e) => {
        setenteredEmail(e.target.value);
    }
    const StateChangeHandler = (e) => {
        setenteredState(e.target.value)
    }

    const ZipCodeChangeHandler = (e) => {
        setenteredZipCode(e.target.value);
    }
    const submitActionHandler = (event) => {
        console.log(enteredFirstName, enteredLastName, enteredPhoneNo)
        event.preventDefault();
        // post
        axios.post(baseUrl, {
            fname: enteredFirstName,
            lname: enteredLastName,
            phone: enteredPhoneNo,
            email: enteredEmail,
            state: enteredState,
            zipcode: enteredZipCode
        })
            .then((response) => {
                alert("phone no " + enteredPhoneNo + " added!");
                navigate("/detail/");
            }).catch(error => {
                alert("error===" + error);
            });
    }
    return (
        <>
        <h3>Contact Book</h3>
            <form onSubmit={submitActionHandler}>
                <div className="py-4 " style={{ marginLeft: '110px' }}>
                    <label className="py-3">FirstName</label>
                    <input type="text" value={enteredFirstName} onChange={FirstNameChangeHandler}></input><br />
                    <label className="py-2">LastName</label>
                    <input type="text" value={enteredLastName} onChange={LastNameChangeHandler}></input><br />
                    <label className="py-3">Phone No</label>
                    <input type="number" value={enteredPhoneNo} onChange={PhoneNoChangeHandler}></input><br />
                    <label className="py-2 px-3">email</label><input type="email" value={enteredEmail} onChange={EmailChangeHandler} /><br />
                    <label className="py-3 px-3">State</label>
                    <select value={enteredState} onChange={StateChangeHandler}>
                        <option value="">Select State</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                    </select><br />
                    <label className="py-2">ZipCode</label><input type="number" value={enteredZipCode} onChange={ZipCodeChangeHandler} /><br />
                </div>
                <div className="text-center">
                <button>submit</button>
                </div>
            </form>
            
        </>
    )
}
export default Create;