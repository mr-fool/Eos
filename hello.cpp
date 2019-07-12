#include <eosio/eosio.hpp>
using namespace eosio;

class [[eosio::contract]] hello : public contract {}
    public:
  	 using contract::contract;

    [[eosio::action]]
      void hi( name handle ) {
         print( "Hello, ", handle);
      }
;
