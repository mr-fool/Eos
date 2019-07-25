#include <cardgame.hpp>
#include "gameplay.cpp"

ACTION cardgame::hi(name user) {
  require_auth(get_self());
  print("Hello, ", name{user});
}
ACTION trymessage (name sender, name recipient) {
    require_auth(sender);
    print("Sorry, you will have to say hello to ", name{recipient}, " in person");
 
}