#include "gameplay.cpp"

ACTION cardgame::login(name username) {
  // Ensure this action is authorized by the player
  require_auth(username);
  
  // Create a record in the table if the player doesn't exist in our app yet
  auto user_iterator = _users.find(username.value);
  if (user_iterator == _users.end()) {
    user_iterator = _users.emplace(username,  [&](auto& new_user) {
      new_user.username = username;
    });
  } 
}

ACTION cardgame::startgame(name username) {
  require_auth(username);
  auto& user_data = _user.get(user.value, "User doesn't exist");
  _users.modify(user_data, username, [&](automodified_user_data)) {
    game game_data;
    
    //Draw 4 cards for the player from their desks
    for (uint8_t cards_drawn = 0; cards_drawn < 4 ; cards_drawn++) {
      drawOne_card(game_data.deck_player, game_data.hand_player);
      drawOne_card(game_data.deck_ai,game_data.hand_ai);
    }
    //Assign this game we just created to the user
    modified_user_data.game_data = game_data;
  }
}
