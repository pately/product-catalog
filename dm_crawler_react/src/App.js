import React from 'react';
import ContentTable from './components/content_table/content_table'
import Product from './components/Product'

import {Switch, Route} from 'react-router-dom'
function App() {
  const renderProducts = (routerProps) => {
    let shirtId = routerProps.match.params.id
    console.log(decodeURIComponent(shirtId))
    return (shirtId ? <Product product={shirtId}/> : <Product/>)
  }
  return (
    <div className='container'>

      <Switch>
        <Route exact path = '/' component = {ContentTable} />
        <Route path = '/product/:id' render = {routerProps => renderProducts(routerProps)} />
      </Switch>
    </div>
  );
}

export default App;