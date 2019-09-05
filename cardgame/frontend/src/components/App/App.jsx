
import React, { Component } from 'react';
//Components
import { connect } from 'react-redux';
import { Game, Login } from 'components';
import { UserAction } from 'actions';
import { ApiService } from 'services';

class App extends Component {

  constructor(props) {
    super(props);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getCurrentUser();
  }

  getCurrentUser(){
    // extracts setUser of UserAction from Redux
    const { setUser } = this.props;
    //send requests to blockchain to get the currently logged in user
    return ApiService.getCurrentUser()
      //if server returns a username
      .then(username => {
        // saves name to Redux store
          setUser({name: username});
        //ignoring 401 console error
      }).catch(()=>{})
  }

  render() {
    const { user: {name} } = this.props;

    return (
      <div className="App">
        { name && <Game/> }
        { !name && <Login/> }
      </div>
    );
  }

}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setUser: UserAction.setUser,
}

// export a redux-connected react component
export default connect(mapStateToProps, mapDispatchToProps)(App);
