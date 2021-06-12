import React, {useEffect, useState} from 'react';
import styles from './DetailBody.module.css';
import { useParams, useHistory } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Swal from "sweetalert2";

function DetailBody (props) {
    let history = useHistory()
    
    const { id } = useParams();

    const idItem = Number(id);

    const [detail, setDetail] = useState([]),
          [user, setUser] = useState(false);

    const { data } = props;

    useEffect(() => {
        let getUser = localStorage.getItem('user') ? true : false;
        let getUserSoc = localStorage.getItem('userSoc') ? true : false;
        if (getUser || getUserSoc) {
            setUser(true)
        }
        const filtered = data.filter(filter => filter.id === idItem);
        setDetail(filtered);
    }, [data, idItem])

    const addToCartHandle = (list) => {
        if (user) {
            if (localStorage.getItem('cart')) {
                let cartArr = JSON.parse(localStorage.getItem('cart'));
                cartArr.push(list)
                localStorage.setItem('cart', JSON.stringify(cartArr))
                list.cart = true;
                Swal.fire({
                    position: "top-mid",
                    icon: "success",
                    title: `Add To Cart Success`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                history.push('/')
            } else {
                let cartArr = [];
                cartArr.push(list)
                localStorage.setItem('cart', JSON.stringify(cartArr))
                list.cart = true;
                Swal.fire({
                    position: "top-mid",
                    icon: "success",
                    title: `Add To Cart Success`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                history.push('/')
            }
        } else {
            Swal.fire({
                title: "Add To Cart Failed",
                text: 'Please Login First',
                icon: "error",
            });
        }
    }

    return (
        <div className={styles.Detail}>
            {detail.map(list => {      
                return(
                    <div className={styles.Container} key={list.id}>
                        <img src={list.image} alt={list.title}></img>
                        <h2>{list.title}</h2>
                        <p className={styles.Price}>Price: Rp.{list.price}</p>
                        <p className={styles.Desc}>{list.desc}</p>
                        <div className={styles.Cart}>
                            <button disabled={list.cart} onClick={() => addToCartHandle(list)}>
                                Add To Cart  <ShoppingCartIcon className={styles.Icon} />
                            </button>
                        </div>
                    </div>
                )          
            })} 
        </div>
    )
}

export default DetailBody;