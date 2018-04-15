import Web3 from 'web3';
import Kitties from './Kitties';
const contractAddress = require('./cfg').contract;

const getMetamaskAccounts = async () => {
    return new Promise((resolve, reject) => {
        if (!window.web3) {
            reject(new Error('Metamask is blocked'));
        }
        window.web3.eth.getAccounts(function (err, accs) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(accs);
        });
    });
};

const resolveProvider = async () => {
    if (typeof window.web3 !== 'undefined') {
        // Metamask/Mist
        const provider = new Web3(window.web3.currentProvider);
        let accounts = await getMetamaskAccounts();
        provider.eth.defaultAccount = window.web3.eth.defaultAccount;
        if (!provider.eth.defaultAccount) {
            provider.eth.defaultAccount = accounts[0];
        }
        Kitties.mount(provider, contractAddress);
    } else {
        // Fallback. No provider
        window.Web3 = null;
        return Promise.resolve();
    }
};

export default resolveProvider;
