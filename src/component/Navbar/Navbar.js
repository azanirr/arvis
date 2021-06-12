import React, {useState, useEffect} from 'react';
import styles from './Navbar.module.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Logo from '../../assets/spotifygreen.png';
import firebase from '../../config/firebase-config';
import Swal from "sweetalert2";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link, useHistory} from 'react-router-dom';


function Navbar () {

    let history = useHistory()
    
    const [modal, setModal] = useState({
        login: false,
        register: false,
    }),
          [trigger, setTrigger] = useState(false),
          [triggerSoc, setTriggerSoc] = useState(false),
          [user, setUser] = useState(false),
          [userSoc, setUserSoc] = useState(false),
          [cart, setCart] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
        if (localStorage.getItem('user')) {
            setUser(localStorage.getItem('user'))
        }
        if (trigger) {
            let user = firebase.auth().currentUser;
            localStorage.setItem('user', user);
            setUser(user);
            console.log(user)
        }   
    }, [trigger])

    useEffect(() => {
        if (localStorage.getItem('userSoc')) {
            setUserSoc(JSON.parse(localStorage.getItem('userSoc')))
        }
    }, [triggerSoc])
    
    const onChange = (name, value) => {
        setModal({
            [name]: value,
        });
        console.log("modal is" + modal);
    };

    const handleSignOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart')
        firebase.auth().signOut().then(function() {
            setUser(false)
            Swal.fire({
                position: "top-mid",
                icon: "success",
                title: `Logout Success`,
                showConfirmButton: false,
                timer: 1500,
            });
            history.push('/')
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    }

    const handleSignOutSoc = () => {
        localStorage.removeItem('userSoc');
        localStorage.removeItem('cart')
        Swal.fire({
            position: "top-mid",
            icon: "success",
            title: `Logout Success`,
            showConfirmButton: false,
            timer: 1500,
        });
        history.push('/')
        setUserSoc(false)
    }

    const { login, register } =  modal;

    return(
        <div className={styles.Navbar}>
            <div>
                <Link to="/">
                    <img src={Logo} alt="logo"></img>
                </Link>
            </div>
            <div className={styles.Auth}>
                {user && 
                <ul>
                    <li>{user.email ? user.email : ""}</li>
                    <li onClick={handleSignOut}>Sign Out</li>
                    {cart &&
                        <Link to="/cart">
                        <li style={{display: 'flex', alignItems: 'center'}}>
                            <IconButton  color="primary" aria-label="add quantity">
                                <ShoppingCartIcon />
                            </IconButton>
                        </li>
                    </Link>
                    }   
                </ul>
                }  
                {userSoc && 
                <ul>
                    <li>{userSoc?.displayName}</li>
                    <li onClick={handleSignOutSoc}>Sign Out</li>
                    {cart &&
                    <Link to="/cart">
                        <li style={{display: 'flex', alignItems: 'center'}}>
                            <IconButton  color="primary" aria-label="add quantity">
                                <ShoppingCartIcon />
                            </IconButton>
                        </li>
                    </Link>
                    }   
                </ul>
                } 
                {user === false && userSoc === false &&    
                <ul>
                    <li onClick={() => onChange("register", true)}>Sign Up</li>
                    <li onClick={() => onChange("login", true)}>Sign In</li>
                </ul>
                }          
            </div>
            {login &&
                <Login
                    open={login}
                    setTrigger={setTrigger}
                    setTriggerSoc={setTriggerSoc}
                    setUserSoc={setUserSoc}
                    onClose={() => onChange("login", false)}/>
            }
            {register &&
                <Register
                    open={register}

                    onClose={() => onChange("login", false)}/>
            }
        </div>
    )
}
export default Navbar;