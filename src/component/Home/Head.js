import React from 'react';
import styles from './Head.module.css';
import Logo from '../../assets/spotifygreen.png';


function Head () {

    return (
        <div className={styles.Head}>
            <div className={styles.Title}>
                <img src={Logo} alt={Logo}></img>
                <h1>Your best Instrument Store</h1>
            </div>
        </div>
    )
}
export default Head;