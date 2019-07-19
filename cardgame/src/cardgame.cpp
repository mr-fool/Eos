#include <cardgame.hpp>
#include "gameplay.cpp"

ACTION cardgame::hi(name user) {
  require_auth(user);
  print("Hello, ", name{user});
}
