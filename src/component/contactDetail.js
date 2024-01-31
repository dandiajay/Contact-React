import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const ContactDetail = () => {
  const baseUrl = 'http://localhost:3000'; // Assuming your users are stored at this endpoint
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch]=useState('')

  console.log(contacts)

  const setContactData = () => {
    axios.get(baseUrl+ "/contact").then((response) => {
      console.log(response.data);
      setContacts(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setContactData();
  }, []);

  const removeContact = (id) => {
    axios.delete(baseUrl + "/contact/" + id)
      .then((response) => {
        alert("Contact " + id + " deleted!");
        setContactData();
        navigate('/');
      })
      .catch(error => {
        alert("Error occurred while deleting contact: " + error);
      });
  }

  return (
    <div className='contact-details'>
      <h3>Submitted Contact Information:</h3>
      <button
        className="btn btn-primary nav-item active"
        onClick={() => navigate("/")}>
        Create New Website
      </button>
      <div class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)}/>
              </div>

              {contacts.filter((contact) => {
        const searchValue = search.trim();
        if (!searchValue) return true;

        const {
          fname = '',
          lname = '',
          state = '',
          phone = '',
          email = '',
        } = contact;

        return (
          fname.toLowerCase().includes(searchValue) ||
          lname.toLowerCase().includes(searchValue) ||
          state.toLowerCase().includes(searchValue) ||
          phone.toLowerCase().includes(searchValue) ||
          email.toLowerCase().includes(searchValue)
        );
      })
      .map((contact, index) => (
          <div className="contact-details" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
            <div>
              <p>Name: {contact.fname} {contact.lname}</p>
              <p>Phone No: {contact.phone}</p>
              <p>State: {contact.state}</p>
              <p>Email: {contact.email}</p>
              <p>Zip Code: {contact.zipcode}</p>
            </div>
            <button
              onClick={() => removeContact(contact.id)}
              className="button" >
              Delete
            </button>

                        <button
                         onClick={() => navigate("/ContactDetailsEdit/" + contact.id)} className="button"
                        > Edit
                        </button>
          </div>
        ))
      }
    </div>
  );
};

export default ContactDetail;
