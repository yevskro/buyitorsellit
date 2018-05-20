export default (state = {
                  _id: '',
                  name: '', 
                  location: '',
                  price: '',
                  description: '',
                  sold: false,
                  loading: true,
                  imgUrl: '',
                  likes: 0
                }, action) => {
    switch (action.type){
      case 'LOADING_ITEM':
        return { loading: true }//Object.assign({}, state, {loading: true})
      case 'UPDATE_STATE':
        return Object.assign({},state,action.state, {loading: false})
      case 'DEFAULT_IMAGE':
        return { ...state , imgUrl: "http://www.freeiconspng.com/uploads/3d-question-mark-icon-blue-color-picture-6.png" }
      case 'LIKE_ITEM':
        return Object.assign({}, state, {"likes": state.likes + 1})
      case 'CLEAR_STATE':
        return {
          _id: '',
          name: '', 
          location: '',
          price: '',
          description: '',
          imgUrl: '',
          likes: 0,
          loading: false
        }
      default:
        return state;
    }
  }
  