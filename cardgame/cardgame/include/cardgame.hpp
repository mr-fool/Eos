#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;
CONTRACT cardgame : public contract {

  private:
    
    enum game_status: int8_t {
      ONGOING = 0,
      PLAYER_WON = 1,
      PLAYER_LOST = -1
    };
    
    enum card_type: int8_t {
      EMPTY = 0, //for empty slot in player's hand
      FIRE = 1, 
      WOOD = 2,
      WATER = 3,
      NEUTRAL = 4,
      VOID = 5
    };
    
    struct game {
      int8_t life_player = 5;
      int8_t life_ai = 5;
      int8_t status = ONGOING;
    };
    
    struct card {
      uint8_t type;
      uint8_t attack_point;
    };
    
    const map<uint8_t, card> card_dict = {
      { 0, {EMPTY, 0} },       
      { 1, {FIRE, 1} },
      { 2, {FIRE, 1} },
      { 3, {FIRE, 2} },
      { 4, {FIRE, 2} },
      { 5, {FIRE, 3} },
      { 6, {WOOD, 1} },
      { 7, {WOOD, 1} },
      { 8, {WOOD, 2} },
      { 9, {WOOD, 2} },
      { 10, {WOOD, 3} }, 
      { 11, {WATER, 1} },
      { 12, {WATER, 1} },
      { 13, {WATER, 2} },
      { 14, {WATER, 2} },
      { 15, {WATER, 3} },
      { 16, {NEUTRAL, 3} }, 
      { 17, {VOID, 0} }
    };
    
    
    TABLE user_info {
      name            username;
      uint16_t        win_count = 0;
      uint16_t        lost_count = 0;
      game            game_data;
      
      auto primary_key() const { return username.value; }
    };

    typedef multi_index<name("users"), user_info> users_table;

    users_table _users;

  public:

    using contract::contract; 
    cardgame( name receiver, name code, datastream<const char*> ds ):
	contract(receiver, code, ds),
	_users(receiver, receiver.value)
	{}

    ACTION login(name username);

};