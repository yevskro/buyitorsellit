import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Item from '../components/Item'
import * as actions from '../actions/Item'

class ItemsShow extends Component{
    handleBuyIt = (event) => {
        event.preventDefault()
        fetch(`/items/${this.props.item._id}`,{
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({sold: true})
          }).then((res) => {
              if(res.status == 200)
                this.props.history.push("/items")
                // else error
            })
    }

    componentWillMount = () => {
        for( const id in this.props.items ){
            if(id == this.props.itemId){
                this.props.actions.updateState({"_id": id})
                this.props.actions.updateState(this.props.items[id])
                return
            }
        }
        this.props.actions.fetchItem(this.props.itemId)
    }
    
    componentWillUnmount = () => this.props.actions.clearState()
    
    handleImgError = (event) => this.props.actions.defaultImage()
    
    handleDeleteItem = (event) => {
        this.props.actions.deleteItem(event.target.id)
        this.props.history.push("/items")
    }

    properButtonElement = (sold) => {
        if(!sold)
            return <button className="button" onClick={this.handleBuyIt}>BuyIt</button>
        return ""
    }
    handleLikeClick = (event) => {
        this.props.actions.likeItem(event.target.dataset.id)
    }
    render(){
        if(this.props.item.loading || this.props.item._id === "")
            return <div id="showpage" className="main"></div>

        let buttonElement = this.properButtonElement(this.props.item.sold)

        return (
            <div id="showpage" className="main">
                <Item item={this.props.item} 
                    id={this.props.item._id}
                    fullShow={true} 
                    onImgError={this.handleImgError} 
                    onDeleteItem={this.handleDeleteItem}
                    onLikedClick={this.handleLikeClick}/>
                {buttonElement}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => { return { actions: bindActionCreators(actions, dispatch) } }
const mapStateToProps = (state, ownProps) => {
    return {
      itemId: ownProps.match.params.itemId,
      item: state.item,
      items: state.items
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ItemsShow);