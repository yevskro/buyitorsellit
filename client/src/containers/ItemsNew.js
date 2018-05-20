import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '../components/TextField'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/Item'

class ItemsNew extends Component{
    handleOnChange = event => {
        if(event.target.id === "price"){
            // only let numbers and the decimal point typed in
            if(event.nativeEvent.data !== null){ // fixes a backspace error
                let typedAsciiCode = event.nativeEvent.data.charCodeAt(0)
                if((typedAsciiCode < 48 || typedAsciiCode > 57) && typedAsciiCode !== 46)
                    return
            }
        }

        this.props.actions.updateState({[event.target.id]: event.target.value })
    }

    handleSubmit(event){
        event.preventDefault()
        if(this.props.item.name === "" || this.props.item.price === "") // validation for name and price
            return

        if(this.props.item.imgUrl === "")   // if its an empty img url it wont error so default it to an empty image
            this.props.actions.defaultImage()

        fetch('/items',{
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({item: this.props.item})
          }).then((res) => {
              if(res.status == "200") {// success redirector to items
                this.props.history.push("/items")
                // else error
              }
            })
    }

    componentWillUnmount = () => this.props.actions.clearState()

    render(){
        return  (
            <div id="newpage" className="main">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>name</label>
                    <TextField id="name" onChange={this.handleOnChange}/><br/>
                    <label>price</label>
                    <TextField id="price" onChange={this.handleOnChange} value={this.props.item.price}/><br/>
                    <label>location</label>
                    <TextField id="location" onChange={this.handleOnChange}/><br/>
                    <label>description</label><br/>
                    <textarea id='description' type='text' name='description' onChange = {this.handleOnChange}></textarea>
                    <br/>
                    <label>link to image</label>
                    <TextField id="imgUrl" onChange={this.handleOnChange}/><br/>
                    <input type="submit" value="SellIt" className="button"/>
                </form>
            </div>
            )
    }
}


const mapDispatchToProps = (dispatch) => { return { actions: bindActionCreators(actions, dispatch) } } 

const mapStateToProps = (state) => { return { item: state.item}  }

export default connect(mapStateToProps, mapDispatchToProps)(ItemsNew);