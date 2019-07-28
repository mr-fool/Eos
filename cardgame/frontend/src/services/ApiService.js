import {Api, JsonRpc} from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';

//Main action call to the blockchain
async function takeAction(action, dataValue) {
    const privateKey = localStorage.getItem("cardgame.key");
    const rpc = new JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
    const JsSignatureProvider = new JsSignatureProvider(privateKey);
    const api = new Api({rpc, JsSignatureProvider,
        textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
        //make our blockchain call after setting our action
        try {
            const resultWithConfig = await api.transact({
                actions: [{
                    account: process.env.REACT_APP_EOS_CONTRACT_NAME,
                    name: action,
                    authorization: [{
                        actor: localStorage.getItem("cardgame_account"),
                        permission: 'active',
                    }],
                    data: dataValue,
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
        }
        catch(err){
            throw(err)
        }
}
class ApiService{

    static login({username, key}){
        return new Promise((resolve, reject)) => {
            localStorage.setItem("cardgame_account", username);
            localStorage.setItem("cardgame_key", key);
            takeAction("login", { username: username })
            .then(() => {
                resolve();
            })
            .catch(err => {
                localStorage.removeItem("cardgame_account");
                localStorage.removeItem("cardgame_key");
                reject(err);
            });
        }
    }
}
export default ApiService;
