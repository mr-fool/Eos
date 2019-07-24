#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;
CONTRACT cardgame : public eosio::contract {

  public:

    cardgame( name receiver, name code, datastream<const char*> ds ):
      contract(receiver, code, ds)
      {}

};