import React, { useState, useEffect } from 'react';
import NavBar from "./componentes/navbar";
import Carusel from './componentes/carusel';
import BarraHome from "./componentes/barraHome";
import ListContainer from './containers/itemListContainer';
import ItemDetailContainer from './containers/itemDetailContainer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CartWidget from './componentes/cartWidget';
import CartProvider from './componentes/cartContext';
import Cart from './componentes/cart';
import {firestore} from './firebase';
const App = function(){

    const [productos, setProductos] = useState([])

    useEffect(() =>{
        
        const db = firestore
        const collection = db.collection("productos");
        const query = collection.get()

        query.then((resultado)=>{
            const productos_array = resultado.docs
            productos_array.forEach(producto=>{
                const producto_final = {
                    id : producto.id,
                    ...producto.data()
                }
                setProductos([...productos,producto_final])
                console.log(producto_final)
            })
        }).catch(()=>{
            console.log("Fallo")
        })
    },[])

    return(
        <>
        <CartProvider>
            <BrowserRouter>
                <NavBar />
                    <Switch>
                        <Route exact path="/">
                            <Carusel/>
                            <BarraHome/>
                            <ListContainer/>
                        </Route>
                        <Route exact path="/category/:id">
                            <ListContainer/>
                        </Route>
                        <Route exact path="/item/:id">
                            <ItemDetailContainer/>
                        </Route>
                        <Route exact path="/cartWidget">
                            <CartWidget/>
                        </Route>
                        <Route exact path="/cart">
                            <Cart/>
                        </Route>
                    </Switch>
            </BrowserRouter>
        </CartProvider>
        </>
    )
}

export default App