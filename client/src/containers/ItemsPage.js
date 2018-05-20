import React, { Component } from 'react'
import ItemList from "../containers/ItemList"
import {connect} from 'react-redux'
import * as actions  from '../actions/Items' 
import { bindActionCreators } from 'redux';

class ItemsPage extends Component{
    componentWillMount = () => this.props.actions.fetchItems()

    handleImgError = (event) => this.props.actions.defaultImage(event.target.id.split("-")[1])

    handleDeleteItem = (event) => {
        this.props.actions.deleteItem(event.target.id)
        this.props.history.push("/items")
    }

    handleLikeClick = (event) => {
        this.props.actions.likeItem(event.target.dataset.id)
    }
    render(){
        if(this.props.items.loading)
            return <div id="indexpage" className="main"></div>

        return (
            <div id="indexpage" className="main">
                <ItemList items={this.props.items} 
                    onImgError={this.handleImgError} 
                    onDeleteItem={this.handleDeleteItem} 
                    onLikedClick={this.handleLikeClick}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => { return { items: state.items } }

const mapDispatchToProps = (dispatch) => { return { actions: bindActionCreators(actions, dispatch) }}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);