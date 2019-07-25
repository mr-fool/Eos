#include <cardgame.hpp>
#include "gameplay.cpp"

ACTION cardgame::login(name user) {
  require_auth(user);
  //look through the _sers table to find user
  auto user_iterator = _users.find(user.value);
  
  //if user does not exist,
  if (user_iterator == _users.end()) {
    
  }
  //create a new record for the user (_users)
 
}