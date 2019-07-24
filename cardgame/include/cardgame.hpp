#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

CONTRACT cardgame : public contract {
  public:
    using contract::contract;
    cardgame(eosio::name receiver, 
      eosio::name code, datastream<const char*> ds):
      contract(receiver, code, ds), 
      _users(receiver, receiver.value)
      {}

    ACTION hi(name user);
  
  private:
    TABLE user_info {
      name username;
      uint64_t win_count = 0;
      uint64_t lost_count = 0;
      
      auto primary_key() const {
        return username.value;
        
      }
    };
    typedef eosio::multi_index
    <name("table"), user_info> users_table;
    users_table _users;
    
    TABLE game_struct {
      uint64_t gameid = 0;
      bool isenabled;
      std::string gameName;
        
    };
     
    typedef eosio::multi_index
    <name("games"), game_struct> game_table;
    game_table _games;
};

EOSIO_DISPATCH(cardgame, (hi))
