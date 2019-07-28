import {Api, JsonRpc} from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';

//Main action call to the blockchain
async function takeAction(action, dataValue) {
    const privateKey = localStorage.getItem("cardgame.key");
    const rpc = new JsonRpc();
}