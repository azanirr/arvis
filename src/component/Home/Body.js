import React from 'react';
import styles from './Body.module.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Link} from 'react-router-dom';

function Body (props) {

    const { data } = props;

    return (
        <div className={styles.Body}>
            <div className={styles.Title}>
                <h1>Our Best Products</h1>
            </div>
            <div className={styles.Container}>
            {data.map((list, i) => {
                let data = list.desc;
                data = data.substr(0, 100);
                data = data.substr(0, Math.min(data.length, data.lastIndexOf(" "))) + ".....";
                return (
                    <div className={styles.Card} key={i}>
                        <img src={list.image} alt={list.id}></img>
                        <h3>{list.title}</h3>
                        <p className={styles.Price}>Price: Rp.{list.price}</p>
                        <p className={styles.Desc}>{data}</p>
                        <div className={styles.Detail}>
                            <Link to={"/detail/" + list.id}>
                                <button>
                                    DETAIL <ArrowForwardIosIcon />
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
export default Body;