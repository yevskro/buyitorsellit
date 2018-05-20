export function setItems(items){
    return {
        type: 'SET_ITEMS',
        items: items.items
    }
}

export function defaultImage(id){
    return {
        type: 'DEFAULT_ITEM_IMAGE',
        id: id
    }
}

export function deleteItem(id){
    fetch(`/items/${id}`,{
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'delete',
      })
    return {
        type: 'DELETE_ITEM',
        id: id
    }
}

export function likeItem(id){
    return function(dispatch){
        fetch(`/items/${id}`,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({"liked": "yes"})
            }).then((res) => {
                if(res.status == 200)
                    dispatch({type: "LIKE_ITEM_IN_LIST", id: id})
            })
    }
}

export function fetchItems() {
    return function(dispatch){
      dispatch({type: 'LOADING_ITEMS'})
      return fetch('/items', {
          headers: {
              Accept: "application/json"
          }
      }).then(data => {
        if(data.status === 500){
            return undefined
        }
        else{
            return data.json()
        }
      }).then(jsonObjs => {
          if(jsonObjs !== undefined)
            dispatch({type: 'SET_ITEMS', items: jsonObjs})
      })
    }
  }
  