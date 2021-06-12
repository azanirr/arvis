import firebase from '../config/firebase-config';

export const socialMediaAuth = (provider, onClose) => {
    onClose();
    return firebase.auth().signInWithPopup(provider).then(res => {
        return res.user;
    })
    .catch(err => {
        console.log(err)
    })
}
