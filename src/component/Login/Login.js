import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "@material-ui/core";
import React from 'react';
import styles from './Login.module.css';
import { useFormik } from "formik";
import Button from '@material-ui/core/Button';
import * as Yup from "yup";
import firebase from '../../config/firebase-config';
import Swal from "sweetalert2";
import Logo from '../../assets/spotifygreen.png';
import LogoG from '../../assets/google.png';
import LogoF from '../../assets/fb.png'
import { socialMediaAuth } from '../../service/auth';
import { facebookProvider, googleProvider } from '../../config/authMethods';

function Login (props) {

    const { open, onClose, setTrigger, setUserSoc, setTriggerSoc } = props;

    const handleSocialLogin = async (provider) => {
        const res = await socialMediaAuth(provider, onClose);
        console.log(res);
        setUserSoc(res);
        localStorage.setItem('userSoc', JSON.stringify(res));
        setTriggerSoc(true)
    }

    const schemaLogin = Yup.object().shape({
        email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
        password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required"),
    });
    
    const loginEmailAuth = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            console.log(res)
            Swal.fire({
                position: "top-mid",
                icon: "success",
                title: `Login Success, Welcome`,
                showConfirmButton: false,
                timer: 1500,
              });
            setTrigger(true);
            onClose();
        }).catch(error => {
            console.log(error);
        });
    }

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: schemaLogin,
        onSubmit: (values) => {
            loginEmailAuth(values.email, values.password);
        },
      });


    return (
        <Modal open={open} onClose={onClose} className={styles.Modal}>
            <div className={styles.Login}>
                <div className={styles.Header}>
                    <img src={Logo} alt={Logo}></img>
                    <h1>Login Your Account</h1>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className={styles.Form}>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                className={formik.touched.email && formik.errors.email ? styles.ErrorInput : null}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="enter your email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></input>
                            {formik.touched.email && formik.errors.email ? (
                            <div className={styles.ErrorMsg}>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                className={formik.touched.password && formik.errors.password ? styles.ErrorInput : null}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="enter your password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></input>
                            {formik.touched.password && formik.errors.password ? (
                            <div className={styles.ErrorMsg}>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className={styles.Submit} >
                            <Button variant="contained" color="primary" type="submit">
                                LOGIN
                            </Button>
                        </div>
                        <p>Sign In With</p>
                        <div className={styles.AuthFacebook} onClick={() => handleSocialLogin(facebookProvider)}>
                            <Button
                            variant="contained"
                            color="primary">
                            <img src={LogoF} alt={LogoF}></img></Button>
                        </div>
                        <div className={styles.AuthGoogle} onClick={() => handleSocialLogin(googleProvider)}>
                        <Button
                            variant="contained"
                            color="secondary">
                        <img src={LogoG} alt={LogoG}></img></Button>
                        </div>
                    </form>
                </div>

            </div>
        </Modal>
    )
}

export default Login;