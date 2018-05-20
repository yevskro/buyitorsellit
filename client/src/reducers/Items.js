const convertJSONToDictionary = (jsonItems) => {
  let objs = {}
  jsonItems.forEach(function(element){
    objs[element._id] = { name: element.name,
                        sold: element.sold,
                        price: element.price,
                        location: element.location,
                        imgUrl: element.imgUrl,
                        likes: element.likes,
                        description: element.description }
  })
  return objs
}
export default (state = {loading: true}, action) => {
    let newState = {}
    switch (action.type){
        case 'LOADING_ITEMS':
          return {loading: true}
        case 'SET_ITEMS':
          let dictionary = convertJSONToDictionary(action.items)
          dictionary["loading"] = false
          return dictionary
        case 'DELETE_ITEM':
          newState = {...state}
          delete newState[action.id]
          return newState
        case 'LIKE_ITEM_IN_LIST':
          newState = {...state}
          newState[action.id].likes++
          return newState
        case 'DEFAULT_ITEM_IMAGE':
          newState = {...state}
          newState[action.id].imgUrl = "http://www.freeiconspng.com/uploads/3d-question-mark-icon-blue-color-picture-6.png"
          return newState
      default:
        return state;
    }
  }
  