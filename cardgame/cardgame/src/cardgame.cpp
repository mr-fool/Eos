#include "cardgame.hpp"
#include "gameplay.cpp"

ACTION cardgame::login(name username) {
  require_auth(username);
  
  auto user_iterator = _users.find(username.value);
  if (user_iterator == _users.end()) {
    // create a new record for the user (_users)
    user_iterator = _users.emplace
      (username, [&](auto& new_user) {
        new_user.username = username;
      });
  }
}

ACTION cardgame::startgame(name username) {
  require_auth(username);
  
  auto& user_data = _users.get(username.value, "User doesn't exist");
  
  _users.modify(user_data, username, [&](auto& modified_user_data) {
    game game_data;
    
    //Draw 4 cards for the player and the AI from their decks
    for (uint8_t cards_drawn = 0; cards_drawn < 4; cards_drawn++) {
      draw_one_card(game_data.deck_player, game_data.hand_player);
      draw_one_card(game_data.deck_ai, game_data.hand_ai);
    }
    
    //assign this game we just created to the user
    modified_user_data.game_data = game_data;
  });
  
}

ACTION cardgame::play