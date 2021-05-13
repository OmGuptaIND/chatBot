import React, {useState} from "react";
import "./LoginPage.css";

//components;
import UserName from "../../../images/user.png";
import Password from "../../../images/pass.png";
import Logo from "../../../images/logo.png";
import bolb from "../../../images/blob.svg";
import { Fade } from "react-reveal";
import { useHistory } from "react-router";
import axios from "axios";
import { useStateValue } from "../../../StateProvider/StateProvider";

export default function LoginPage() {
  const [{user}, dispatch] = useStateValue();
    let history = useHistory();
    const [data, setData] = useState({
        email:"",
        password:"",
    });
    const handleChange = (e) =>{
        const value = e.target.value;
        const name = e.target.name;
        if(name === "email"){
           return setData(prevData => ({...prevData, email:value}));
        }else{
           return setData(prevData => ({...prevData, password:value}));
        }
    }
    const handleClick = async(e) => {
        e.preventDefault();
        console.log(data);
        await axios.post('signin', data)
        .then(res => 
          dispatch({
            type:"SET_USER",
            user:res.data.user
          })
        )
        .catch(err => console.log(err));
        setData({
            email:"",
            password:"",
        });
    }
  return (
    <>
      <Fade>
        <img className="bolb" src={bolb} alt="err" />
      </Fade>
      <Fade>
        <div className="login">
          <img src={Logo} alt="err" />
          <div className="login-wrapper">
            <div className="input-wrapper">
              <img src={UserName} alt="err" placeholder="Enter Email" />
              <input value={data.email} onChange={handleChange} name='email' autoComplete='off' autoFocus='on' type="email" placeholder="Enter Email" />
            </div>
            <div className="input-wrapper">
              <img src={Password} alt="err" />
              <input name='password' value={data.password} onChange={handleChange} type="password" placeholder="Enter Password" />
            </div>
            <button onClick={handleClick} className="input-btn">Login</button>
            <p className='forgot' >Or <u>Forgot Password ?.</u></p>
            <p className='register' onClick={()=>history.push('/register')} >New User ?. Register Here</p>
          </div>
        </div>
      </Fade>
    </>
  );
}
