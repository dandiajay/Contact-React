import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
 import axios from "axios";


const ContactDetailsEdit=()=>{
    const baseUrl="http://localhost:3000";
const navigate=useNavigate('');
const { id } = useParams();

const [currentFirstName,setcurrentFirstName]=useState('');
const [currentLastName,setcurrentLastName]=useState('');
const [currentEmail,setcurrentEmail]=useState('');
const [currentPhoneNo,setcurrentPhoneNo]=useState('');
const [currentState,setcurrentState]=useState('');
const [currentZipCode,setcurrentZipCode]=useState('');

//fetch or retrive data
const getContactData=()=>{
    axios.get(baseUrl+"/contact/"+id)
    .then((response)=>{
      const setcurrentContactData=response.data
      
      setcurrentFirstName(setcurrentContactData.fname);
      setcurrentLastName(setcurrentContactData.lname);
      setcurrentPhoneNo(setcurrentContactData.phone);
      setcurrentState(setcurrentContactData.state);
      setcurrentEmail(setcurrentContactData.email);
      setcurrentZipCode(setcurrentContactData.zipcode);

    }).catch(error=>{
      alert("Error occured while loading the data"+error);
    })
  }

  const submitActionHandler=(event)=>{
    event.preventDefault();

    axios.put(baseUrl+"/contact/"+id,{
      fname:currentFirstName,
      lname:currentLastName,
      email:currentEmail,
      state:currentState,
      phone:currentPhoneNo,
      zipcode:currentZipCode
    })
    .then((response)=>{
      alert("contact updated");
      navigate("/");
    }).catch(error=>{
      alert("error=="+error)
    });

  };

  useEffect(()=>{
    if(id)
    getContactData(id);
  },[id])

  const FirstNameChangeHandler=(event)=>{
  setcurrentFirstName(event.target.value);    
  }
  const LastNameChangeHandler=(event)=>{
    setcurrentLastName(event.target.value);
  }
  const EmailChangeHandler=(event)=>{
    setcurrentEmail(event.target.value);
  }
  const StateChangeHandler=(event)=>{
    setcurrentState(event.target.value);
  }
  const PhoneNoChangeHandler=(event)=>{
    setcurrentPhoneNo(event.target.value);
  }
  const ZipCodeChangeHandler=(event)=>{
    setcurrentZipCode(event.target.value);
  }


    return(
     <>
     <h3>Update Contact</h3>
     <form onSubmit={submitActionHandler}>
                <div className="py-4 " style={{ marginLeft: '110px' }}>
                    <label className="py-3">FirstName</label>
                    <input type="text" value={currentFirstName} onChange={FirstNameChangeHandler}></input><br />
                    <label className="py-2">LastName</label>
                    <input type="text" value={currentLastName} onChange={LastNameChangeHandler}></input><br />
                    <label className="py-3">Phone No</label>
                    <input type="number" value={currentPhoneNo} onChange={PhoneNoChangeHandler}></input><br />
                    <label className="py-2 px-3">email</label><input type="email" value={currentEmail} onChange={EmailChangeHandler} /><br />
                    <label className="py-3 px-3">State</label>
                    <select value={currentState} onChange={StateChangeHandler}>
                        <option value="">Select State</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                    </select><br />
                    <label className="py-2">ZipCode</label><input type="number" value={currentZipCode} onChange={ZipCodeChangeHandler} /><br />
                </div>
                <div className="text-center">
                <button>Update</button>
                </div>
            </form>
        </>
    )
}
export default ContactDetailsEdit;