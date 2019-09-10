#include <eosio/system.hpp>

int cardgame::random(const int range) {
  // find the existing seed 
  auto seed_iterator = _seed.begin();
  // initialize the seed if not found (if not used)
  if (seed_iterator == _seed.end()) {
    seed_iterator = _seed.emplace(_self, [&](auto& seed) {
      // defaults are good enough
    });
  }
  
  int prime = 65337;
  auto new_seed_value = (seed_iterator->value + eosio::current_time_point().sec_since_epoch()) % prime;
  
  _seed.modify(seed_iterator,_self,[&](auto& seed){
    seed.value = new_seed_value;
  });
  
  int random_result = new_seed_value % range;
  return random_result;
}

void cardgame::draw_one_card
      (vector<uint8_t>& deck, vector<uint8_t>& hand) {
  // pick a random card from the deck
  int deck_card_idx = random(deck.size());
  
  //find the first empty slot in the player's hand
  int first_empty_slot = -1;
  for (int slot_to_check = 0; slot_to_check <= hand.size();
        slot_to_check++) {
    auto id = hand[slot_to_check];
    
    if (card_dict.at(id).type == EMPTY) {
      first_empty_slot = slot_to_check;
      break;
    }
  }
  
check(first_empty_slot != -1,
        "No empty slot in player's hand");
        
  // assign the card we randomly picked to the empty spot
  hand[first_empty_slot] = deck[deck_card_idx];
  
  // erase the card from the player's/AI's deck
  deck.erase(deck.begin() + deck_card_idx);
  
  //place the card in that slot
}
