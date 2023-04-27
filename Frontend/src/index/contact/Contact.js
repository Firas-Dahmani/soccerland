import './contact.css'
import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { contactAction } from '../../Redux-dep/actions/contactActions';
import Navbar from '../indexnav/Navbar';
import AlertCompnenet from '../../Components/Alert/AlertCompnenet';

function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [messageContact, setMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contact = useSelector((state) => state.contact);
    const err = contact.error;

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const variableContact = [
      name,
      email,
      phone,
      messageContact
    ]
    dispatch(contactAction(variableContact, navigate))
  }

  return (
      <>
        <Navbar />

        <div className='contactUs'>
          <div className="box">
            <div className="contact form">
              <h3 className='mb-3'>Envoyer un message</h3>
              <Form onSubmit={handleSubmit}>
                {err && <AlertCompnenet error={err}/>}
                  <div className="formBox">
                  <div className="row50">
                      <Form.Group className="inputBox"  controlId="name">
                        <Form.Label className='labelContact'>Nom *</Form.Label>
                        <Form.Control 
                        required 
                        placeholder="Your name" 
                        className="form-control"
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group >

                      <Form.Group className="inputBox"  controlId="phone">
                        <Form.Label className='labelContact'>Telephone</Form.Label>
                        <Form.Control 
                        required 
                        placeholder="Phone #" 
                        className="form-control"
                        type="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group >
                    </div>

                    <div className="row100">
                      <Form.Group className="inputBox"  controlId="email">
                          <Form.Label className='labelContact'>Email</Form.Label>
                          <Form.Control 
                          required 
                          placeholder="Your email" 
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          className="form-control"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          />
                      </Form.Group >
                    </div>

                    <div className="row100" >
                      <Form.Group className="inputBox"  controlId="message">
                        <Form.Label className='labelContact'>Message *</Form.Label>
                        <Form.Control 
                        as="textarea" 
                        cols={30} 
                        rows={4}
                        required 
                        placeholder="Write your message" 
                        className="form-control"
                        
                        value={messageContact}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                      </Form.Group >
                    </div>
                    <Button type="submit" className='row100'>
                          Send
                    </Button>
                  </div>
                </Form>
            </div>
            <div className="contact info">
                <h3 className='mb-3'>Contact Information</h3>
                <p className="mb-3">Gregio est une agence spécialisée dans la conception et la réalisation de sites/applications Web et Mobiles.</p>
                <ul className="list-unstyled">
                  <li className="d-flex">
                  <span className="wrap-icon fas fa-phone mr-3"></span>
                    <span className="text"> 53 784 010</span>
                  </li>
                  <li className="d-flex">
                    <span className="wrap-icon far fa-envelope mr-3"></span>
                    <span className="text"> gregiotn@gmail.com</span>
                  </li>
                </ul>
            </div>
            <div className="contact map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12938.92594504663!2d10.6037494!3d35.8310632!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x91956a024801f1f4!2sGREGIO!5e0!3m2!1sfr!2stn!4v1662584104926!5m2!1sfr!2stn"   loading="lazy" ></iframe>
            </div>
          </div>
        </div>
      </>
  )
}



export default Contact