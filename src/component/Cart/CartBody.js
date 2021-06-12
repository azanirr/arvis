import styles from './CartBody.module.css';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function CartBody () {

    const [data, setData] = useState([]),
          [trigger, setTrigger] = useState(0),
          [totalPriceAll, setTotalPriceAll] = useState(0)

    
    const useStyles = makeStyles({
        table: {
        minWidth: 650,
        },
    });

    const handleAddQuantity = (id) => {
        let tmp = data;
        for (let i = 0;  i < tmp.length; i++) {
            if (id === tmp[i].id) {
                tmp[i].quantity += 1;
            }
        }
        setData(tmp);
        setTrigger(trigger + 1)
    }

    const handleMinQuantity = (id) => {
        let tmp = data;
        for (let i = 0;  i < tmp.length; i++) {
            if (id === tmp[i].id && tmp[i].quantity > 1) {
                tmp[i].quantity -= 1;
            }
        }
        setData(tmp);
        setTrigger(trigger + 1)
    }

    const deleteCart = (id) => {
        const filtered = data.filter(filtered => filtered.id !== id)
        setData(filtered)
        setTrigger(trigger + 1)
    }

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setData(JSON.parse(localStorage.getItem('cart')))
        }  
    }, [])

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum += data[i].price * data[i].quantity
        }
        setTotalPriceAll(sum)
    }, [data, trigger])


    const classes = useStyles();

    return(
        <div className={styles.Container}>
            <div className={styles.Cart}>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price&nbsp;(Rp.)</TableCell>
                            <TableCell align="right">Total Price&nbsp;(Rp.)</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                {i + 1}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.price * row.quantity}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleAddQuantity(row.id)} color="primary" aria-label="add quantity">
                                    <AddIcon />
                                </IconButton>
                                <IconButton onClick={() => handleMinQuantity(row.id)} aria-label="delete">
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={() => deleteCart(row.id)} color="secondary" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>                 
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">{totalPriceAll}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
    )
}

export default CartBody;