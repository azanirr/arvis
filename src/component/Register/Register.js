import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "@material-ui/core";
import React from 'react';
import styles from './Register.module.css';
import Logo from '../../assets/spotifygreen.png';
import { useFormik } from "formik";
import Button from '@material-ui/core/Button';
import * as Yup from "yup";
import firebase from '../../config/firebase-config';
import Swal from "sweetalert2";

function Register (props) {
    
    const { open, onClose } = props;

    const schemaRegister = Yup.object().shape({
        email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
        password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required"),
    });

    const registerEmailAuth = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
            console.log(res);
            Swal.fire({
                position: "top-mid",
                icon: "success",
                title: `Register Success, Welcome`,
                showConfirmButton: false,
                timer: 1500,
              });
            onClose();
            return res.user      
        }).catch(error => {
            console.log(error);
        });
    }

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: schemaRegister,
        onSubmit: (values) => {
            registerEmailAuth(values.email, values.password);
        },
      });

    return (
        <Modal open={open} onClose={onClose} className={styles.Modal}>
            <div className={styles.Login}>
                <div className={styles.Header}>
                    <img src={Logo} alt={Logo}></img>
                    <h1>Register Your Account</h1>
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
                        <div className={styles.Submit}>
                            <Button variant="contained" color="primary"  type="submit">
                                Register Here
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </Modal>
    )
}

export default Register;