import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '../components/TextField'
import { Component } from 'react'


class Item extends Component {
    properPriceElement = (sold, price) => {
        //{"$" + parseFloat(props.item.price).toFixed(2).toLocaleString(undefined,{minimumFractionDigits: 2, maximumFractionDigits: 2})}
        // was using that before to change price into a currency string, but now I am using ruby on the backend in the serializer
        // to change it into a string
        if(sold === true)
            return <label id="ssold">sold</label>
        return <label id="sprice" className="purple-color">{"$" + parseFloat(price).toFixed(2).toLocaleString(undefined,{minimumFractionDigits: 2, maximumFractionDigits: 2})}</label>
    }
    
    properDescriptionElement = (show, description) => {
        if(show)
            return (
                <div>
                    <label id="sdescription">{description}</label>
                </div>
            )
        return ""
    }

    render(){
        let priceTag, descriptionTag = ""

        priceTag = this.properPriceElement(this.props.item.sold, this.props.item.price)
        descriptionTag = this.properDescriptionElement(this.props.fullShow, this.props.item.description)
        return (
            <div className="item">
                <Link to={"/items/" + this.props.id}><img src={this.props.item.imgUrl} alt={"item"} className="simg" id={"img-" + this.props.id} onError={this.props.onImgError}/></Link>
                <a href="#" className="delete-item" id={this.props.id} onClick={this.props.onDeleteItem}>X</a>
                    <div id="s-info-block">
                        <Link to={"/items/" + this.props.id}>
                            <label id="sname">{this.props.item.name}</label><br/>
                            <label id="slocation">{this.props.item.location}</label><br/>
                        </Link>
                        <span id="click-id" className="like left">&nbsp;{this.props.item.likes}</span>
                        <button className="like-button left" onClick={this.props.onLikedClick} data-id={this.props.id}>Like</button>
                        {priceTag}
                    </div>
                {descriptionTag}
            </div>
        )
    }
}

export default Item