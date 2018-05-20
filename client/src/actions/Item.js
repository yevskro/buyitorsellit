export function clearState(){
    return { type: 'CLEAR_STATE' }
}

export function updateState(obj){
    return {
        type: 'UPDATE_STATE',
        state: obj
    }
}

export function defaultImage(){
    return { type: 'DEFAULT_IMAGE'}
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
                    dispatch({type: "LIKE_ITEM", id: id})
            })
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

export function fetchItem(itemId) {
    return function(dispatch){
      dispatch({type: 'LOADING_ITEM'})
      return fetch(`/items/${itemId}`, {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }  
      })
        .then(data => {
          return data.json()
        }).then(jsonObj => {
          dispatch({type: 'UPDATE_STATE', state: jsonObj})
      })
    }
  }
/*
export function likeItem(itemId, likes){
    fetch(`/items/${itemId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'put'
    })
}*/