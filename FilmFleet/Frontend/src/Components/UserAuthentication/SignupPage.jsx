import React, { useState } from 'react';
import bg from '../../assets/userpage.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSignup } from '../../slice/slice';

const SignUpPage = () => {
  const { screenMode } = useSelector((state) => state.movieReducer);
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
    showGeneralError: false,
  });

  const userLocalCheck = JSON.parse(localStorage.getItem('userDetails')) || [];

  const handleUserForm = (e) => {
    e.preventDefault();

    const isUsernameValid = user.username.trim() !== '';
    const isEmailValid = /\S+@\S+\.\S+/.test(user.email);
    const isPasswordValid = user.password.trim().length >= 8;

    const isAnyFieldMissing = !isUsernameValid || !isEmailValid || !isPasswordValid;

    setError({
      username: !isUsernameValid,
      email: !isEmailValid,
      password: !isPasswordValid,
      showGeneralError: isAnyFieldMissing,
    });

    if (!isAnyFieldMissing) {

      const result = dispatch(getSignup({
        username: user.username,
        email: user.email,
        password: user.password,
        signing: 'register',
      }));

      result.then(result => {
        if (result.payload._id) {
          setStatus(true);
          navigateLogin();
        } else {
          setErrorMessage(result);
        }
    });

      localStorage.setItem('userDetails', JSON.stringify(user));
    }
  };


  function navigateLogin() {
    setTimeout (()=> {
      navigate('/user-authentication/login')
    }, 2000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: false,
      showGeneralError: false, 
    }));
  };


  return (
    <>
      <div className={`flex ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>
        
        <img className="w-[60%]" src={bg} alt="background" />
        <div className='flex flex-col justify-center w-[40%]'>
          <h2 className='text-[28px] my-5 text-center font-bold'>SIGN UP</h2>
          <form onSubmit={handleUserForm} className=" flex flex-col gap-2 justify-center items-center">
            <label htmlFor="username">USER NAME</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className={`border ${error.username ? 'border-red-500' : ''} ${screenMode==="dark"? 'bg-slate-800 text-white':'bg-white text-black border-black'}`}
            />
            {error.username && <p className="text-red-500 text-[14px]">Please enter a valid name</p>}
            <div className="my-1"></div>

            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className={`border ${error.email ? 'border-red-500' : ''} ${screenMode==="dark"? 'bg-slate-800 text-white':'bg-white text-black border-black'}`}
            />
            {error.email && <p className="text-red-500 text-[14px]">Please enter a valid email</p>}
            <div className="my-1"></div>

            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className={`border ${error.password ? 'border-red-500' : ''} ${screenMode==="dark"? 'bg-slate-800 text-white':'bg-white text-black border-black'}`}
            />
            {error.password && <p className="text-red-500 text-[14px]">Please enter a valid password</p>}
            <div className="my-1"></div>

            <button type="submit" className="bg-orange-400 px-4 py-1 rounded-lg hover:bg-orange-300">
              Continue
            </button>
            {error.showGeneralError && (
              <p className="text-red-500 text-[14px]">Please fill in all the fields</p>
            )}
            <Link to='/user-authentication/login'>
              Already have a Account
            </Link>
            {status ?
              (<div className='text-green-500'>
                Sign Up Success
              </div>):(
              <div className='text-red-500'>
                {errorMessage}
              </div>
              )
            }
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
