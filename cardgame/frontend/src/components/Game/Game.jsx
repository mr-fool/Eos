//React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserAction } from 'actions';
import ApiService from '../../services/ApiService';
import { PlayerProfile } from './components';

class Game extends Component {

    constructor(props) {
        //Inherit constructor
        super(props);
        //Bind functions
        this.loadUser = this.loadUser.bind(this);
        //Call 'loadUser' befor mounting the app
        this.loadUser();
    }

    loadUser() {
        //Extract setUser and user.name from redux
        const { setUser, user:{ name }} = this.props;
        //Send req to blockchain via ApiService,
        // get the user object and store 'win_count,' 'lost_count,' and 'game_data'
        return ApiService.getUserByName(name).then(user => {
            setUser({
                win_count: user.win_count,
                lost_count: user.lost_count,
            });
        });

    }

    render() {
        //extract data from the user data of redux's "UserReducer"
        const { user: { name, win_count, lost_count } } = this.props;

        return (
            <section className="Game">
                <PlayerProfile
                    name={ name }
                    winCount= { win_count }
                    lostCount = { lost_count }
                />
            </section>
        )
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    setUser: UserAction.setUser,
};

// Export a connected component
export default connect(mapStateToProps, mapDispatchToProps)(Game);