import React, {useState} from "react";
import "./RegisterPage.css";

//Components;
import Logo from "../../../images/logo.png";
import bolb from "../../../images/blob.svg";
import { Fade } from "react-reveal";
import firstName from '../../../images/name.png';
import Email from '../../../images/email.png';
import word from '../../../images/word.png';
import { useHistory } from "react-router";
import axios from "axios";
import { useStateValue } from "../../../StateProvider/StateProvider";

export default function RegisterPage() {
    let history = useHistory();
    const [{user}, dispatch] = useStateValue();
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    });
    const handleChange = (e) =>{
        const value = e.target.value;
        const name = e.target.name;
        if(name === "email"){
           return setData(prevData => ({...prevData, email:value}));
        }else if (name === 'password'){
           return setData(prevData => ({...prevData, password:value}));
        }else if (name === 'firstName'){
           return setData(prevData => ({...prevData, firstName:value}));
        }else{
           return setData(prevData => ({...prevData, lastName:value}));
        }
    }
    const handleClick = async(e) => {
        e.preventDefault();
        console.log(data);
        await axios.post('signup', data)
        .then(async res=>{
          if(res.status === 200){
            await axios.post('signin', data).then(res => {
              dispatch({
                type:"SET_USER",
                user:res.data.user,
              })
            })
          }
        })
        .catch(err => alert(err));
        setData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
        });
    }
    
  return (
    <>
      <Fade>
        <img className="rg-bolb" src={bolb} alt="err" />
      </Fade>
      <Fade>
        <div className="rg">
          <img src={Logo} alt="err" />
          <div className="rg-wrapper">
            <div className="rg-input">
              <img src={firstName} alt="err" placeholder="Enter Email" />
              <input autoFocus="on" autoComplete="off" onChange={handleChange} name = 'firstName' type="text" placeholder="First Name" value={data.firstName} required />
            </div>
            <div className="rg-input">
              <img src={firstName} alt="err" placeholder="Enter Email" />
              <input autoComplete="off" onChange={handleChange} name = 'lastName' type="text" placeholder="Last Name" value={data.lastName} />
            </div>
            <div className="rg-input">
              <img src={Email} alt="err" placeholder="Enter Email" />
              <input autoComplete="off" onChange={handleChange} name = 'email' type="email" placeholder="Enter Email" required value={data.email} />
            </div>
            <div className="rg-input">
              <img src={word} alt="err" />
              <input onChange={handleChange} name = 'password' type="password" placeholder="Enter Password" required value={data.password} />
            </div>
            <button onClick={handleClick} className="input-btn">Register</button>
            <p className="register" onClick={()=>history.push('/login')} >Already User ?. Login Here</p>
          </div>
        </div>
      </Fade>
    </>
  );
}
