// function ContactList(){
//     return <h1 id='bruh'>bruh</h1>
// }

import React, { useState, useEffect } from 'react';

function ContactsList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('/api/usernames', { method: 'GET' })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                console.log(data); // Log the parsed data
                setContacts(data); // Update state with the returned array
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const contactItems = contacts.map((contact, index) => (
        <div className="container p-2" key={index}>
          <div className="card">
            <div className="card-body p-2">
              <div className="d-flex align-items-start">
                {/* Profile Picture */}
                <img 
                  src={`/api/placeholder/48/48`}
                  className="rounded-circle me-3"
                  width="48"
                  height="48"
                />
                {/* Message Content */}
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="mb-1 fw-bold">{contact.name || "Contact Name"}</h6>
                    <small className="text-muted">10/12</small>
                  </div>
                  <p className="mb-0 text-muted text-truncate">
                    {contact.message || "last message..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
      
      return <div className="list-group">{contactItems}</div>;

    
};
    


export default ContactsList



// const contactItems = contacts.map((contact, index) => (
    //     <a key={index} className="list-group-item list-group-item-action">
            
            
    //         <div>


        

    //             <div className="card-body d-flex align-items-center p-3">
    //                 {/* Contact Photo */}
    //                 <div className="flex-shrink-0">
    //                     <img
    //                         src={`/api/placeholder/48/48`} // Placeholder image
    //                         className="rounded-circle"
    //                         width="48"
    //                         height="48"

    //                     />
    //                 </div>
    //                 {/* Contact Info */}
    //                 <div className="ms-3 flex-grow-1">
    //                     <h6 className="mb-0 fw-bold">{contact}</h6>

    //                     <p className="mb-0 text-muted text-truncate">
    //                         {contact.message || 'Omg I can\'t beli...'}
    //                     </p>
    //                 </div>
    //                 {/* Timestamp */}
    //                 <small className="text-muted ms-auto">N/A</small>
    //             </div>
    //         </div>
    //     </a>
    // ));