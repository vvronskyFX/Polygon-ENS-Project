import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_rushin_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {


		const [currentAccount, setCurrentAccount] = useState(''); //Just a state variable we use to store our user's public wallet. Don't forget to import useState at the top.
		
			// Implement your connectWallet method here
		const connectWallet = async () => {
			try {
				const { ethereum } = window;
	
				if (!ethereum) {
					alert("Get MetaMask -> https://metamask.io/");
					return;
				}

				// Fancy method to request access to account.
				const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			
				// Boom! This should print out public address once we authorize Metamask.
				console.log("Connected", accounts[0]);
				setCurrentAccount(accounts[0]);
			} catch (error) {
				console.log(error)
			}
			
		}

		const checkIfWalletIsConnected = async () => {   // Gotta make sure this is async.
			const { ethereum } = window;     // First make sure we have access to window.ethereum
	
			if (!ethereum) {
				console.log("Make sure you have MetaMask!");
				return;
			} else {
				console.log("We have the ethereum object", ethereum);
			}

			const accounts = await ethereum.request({ method: 'eth_accounts' });  // Check if we're authorized to access the user's wallet

			if (accounts.length !== 0) {      // Users can have multiple authorized accounts, we grab the first one if its there!
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
	};

	const renderNotConnectedContainer = () => (    // Create a function to render if wallet is not connected yet
		<div className="connect-wallet-container">
			<img src="https://media4.giphy.com/media/QWkuGmMgphvmE/giphy.gif?cid=ecf05e47ye1jw98j0lq8c91he37m7jrzy317yujvlt451biz&rid=giphy.gif&ct=g" alt="Digital gif" />
			<button className="cta-button connect-wallet-button">
				Connect Wallet
			</button>
		</div>
  	);

	useEffect(() => {
		checkIfWalletIsConnected();          // This runs our function when the page loads.
	}, [])

  return (
		<div className="App">
			<div className="container">

				<div className="header-container">
					<header>
            <div className="left">
              <p className="title">🐱‍💻 Digital Name Service 🌐</p>
              <p className="subtitle">Your digitally immortal API on the blockchain!</p>
            </div>
					</header>
				</div>

				{!currentAccount && renderNotConnectedContainer()}

        <div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built with ❤️ by @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
}

export default App;
