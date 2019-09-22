//React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserAction } from 'actions';
import ApiService from '../../services/ApiService';
import { PlayerProfile, GameInfo, GameMat } from './components';

class Game extends Component {

    constructor(props) {
        //Inherit constructor
        super(props);
        //Bind functions
        this.loadUser = this.loadUser.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handlePlayCard = this.handlePlayCard.bind(this);
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
                game: user.game_data,
            });
        });

    }
    handlePlayCard(cardIdx) {
        const { user: {game} } =this.props;

        //if the card to be played is an empty card, do nothing
        if (game.hand_player[cardIdx] === 0) {
            return;
        }
        //send req to ApiService to play the card
        //call loadUser again in order to render the latest game
        return ApiService.playCard(cardIdx).then(()=>{
            return this.loadUser();
        });
    }
    
    handleStartGame(){
        //use ApiService to start a game on the blockchain
        //call loadUser again in order to render the latest game
        return ApiService.startGame().then(()=>{
            return this.loadUser();
        });
    }

    render() {
        //extract data from the user data of redux's "UserReducer"
        const { user: { name, win_count, lost_count, game } } =
            this.props;

        const isGameStarted = game && game.deck_ai.length !== 17;
       
        return (
            <section className="Game">
                { !isGameStarted ?
                    <PlayerProfile
                        name={ name }
                        winCount= { win_count }
                        lostCount = { lost_count }
                        onStartGame= { this.handleStartGame }
                    />
                :
                    <div className="container">
                        <GameMat
                            deckCardCount={ game.deck_ai.length }
                            aiLife={ game.life_ai }
                            aiHandCards={ game.hand_ai }
                            aiName="COMPUTER"
                            playerLife={ game.life_player }
                            playerHandCards={ game.hand_player }
                            playerName={ name }
                            onPlayCard =  {this.handlePlayCard}
                        />
                        <GameInfo
                            deckCardCount={ game.deck_ai.length }
                            handCardCount={ game.hand_ai.filter( x => x > 0 ).length }
                        />
                    </div>
                }
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