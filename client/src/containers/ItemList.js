import React from 'react'
import { Link } from 'react-router-dom'
import Item from '../components/Item'

const ItemList = (props) => Object.keys(props.items).map(function(id, index){
        if(id !== "loading"){
            let item = props.items[id]
            return <Item item={item} 
                fullShow={false} 
                onImgError={props.onImgError} 
                onDeleteItem={props.onDeleteItem} 
                id={id}
                key={id} 
                onLikedClick={props.onLikedClick}
                />
        }
    })

export default ItemList