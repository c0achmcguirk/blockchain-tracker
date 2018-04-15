# HomeLNK Blockchain-Based Property Tracker

This tool was created by Team #4 during the 
[Midwest Block-a-thon 2018](https://www.block-a-thon.com/) in Lincoln, NE. This was during the 
April 13-15th weekend. We focused on taking on the outdated processes used in the housing title 
company industry.

## Installation Instructions

We didn't spend a lot of time making this streamlined, so we have some TODOs to make this easier.
🤓. Here is how you can get it running today.

1. Install [truffle](https://github.com/trufflesuite/truffle), which also will install [ganache]().

2. Install some global node packages, assuming you have `npm` and `node` installed.
    ```c
    npm install -g nodemon
    npm install -g concurrently
    npm install -g yarn
    ```

3. Assuming you've cloned this directory, run the following from the root folder of this repo.
    ```c
    # From the blockchain-tracker/ folder
    npm install && yarn install
    ```

4. Run the same thing in the `webui` folder.
    ```c
    # From the blockchain-tracker/webui/ folder
    npm install && yarn install
    ```

5. Run the same thing (sorry!) in the `webui/frontend` folder.
    ```c
    # From the blockchain-tracker/webui/frontend folder
    npm install && yarn install
    ```

6. Open Ganache.

7. Migrate the contracts to the local Ganache blockchain.
    ```c
    # From the blockchain-tracker/ folder
    truffle migrate --reset
    ```

8. Look at the output of the `truffle migrate` command, you will see the deployed address of the
contract. You'll see something like this:

    ```c
      Replacing PropertyManager...
        ... 0xf0bb6b9ed2f5a8017e6aa331a8d2f5310d3a8c368fd6b202eae0bf59523c1e1e
          PropertyManager: 0x4b167cb9e4e60f9a1a1cebde5fdbaac5ed98350f
    ```

9. Take the address next to PropertyManager (the one that starts with `0x4b1...` and put it in the 
`blockchain-tracker/webui/config/default.json` for the `contractAddress` entry.

10. In the Ganache UI, look at the 10 addresses you see on **Accounts** tab. Copy one of the
addresses and replace the entry in the `blockchain-tracker/webui/config/default.json` for the
`fromAddress` entry. It will look like this: `0x9F5E71bEA927d29b9c7126a4eD3A57651e7b2D5a`.

11. Fire up the app. It can be started by

    ```c
    # from the blockchain-tracker/webui/
    yarn start
    ```

    It will open up your browser, pointed to http://localhost:3000/

### Architecture

This app uses:

  * Ganache for a local ethereum blockchain
  * Node and ExpressJS for the business logic and linking the frontend to the blockchain
  * React for the frontend
