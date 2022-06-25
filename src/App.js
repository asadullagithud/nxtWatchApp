import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import SavingVideos from './components/SavingVideos'
import VideoDetails from './components/VideoDetails'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
    team: false,
  }

  changeTeam = () => {
    this.setState(prevState => ({team: !prevState.team}))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )

    if (productObject) {
      console.log(`cartList: ${cartList}`)
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
      console.log(updatedCartList)
    }
  }

  render() {
    const {cartList, team} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          team,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          changeTeam: this.changeTeam,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavingVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id/"
              component={VideoDetails}
            />
            <Route path="/bad-path" component={NotFound} />
            <Redirect to="/bad-path" />
          </Switch>
        </>
      </CartContext.Provider>
    )
  }
}
export default App
