import { Request, Response } from "express";
//Import libraries
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";

//@ts-ignore
// import qrcode from 'qrcode-terminal'

let wallet: any = null;
let xmtp: any = null;
//Fabri wallet
let WALLET_TO: any = null;
let conversation: any = null;

export const sendMessage = async (req: Request, res: Response) => {
  const message = req.body.message;
  await initialize_the_wallet_from_key();
  console.log(JSON.stringify(wallet));
  await create_a_client();
  await start_a_new_conversation();
  // console.log("xmtp", JSON.stringify(xmtp));
  // console.log("conversation", JSON.stringify(conversation));
  await send_a_message(message);
  res.status(200).send({
    wallet
  });
  //await initialize_the_wallet();
};

//Initialize the wallet
async function initialize_the_wallet_from_key() {
  // You'll want to replace this with a wallet from your application
  wallet = new Wallet(
    "ff5bdadbf2a7133e5cfc9020dfe0b63433228028ff18f6ea3d127b8b994120f0"
  );
  console.log(`Wallet address: ${wallet.address}`);
}
//Initialize the wallet
async function initialize_the_wallet() {
  // You'll want to replace this with a wallet from your application
  wallet = Wallet.createRandom();
  console.log(`Wallet address: ${wallet.address}`);
}

// Create a client
async function create_a_client() {
  if (!wallet) {
    console.log("Wallet is not initialized");
    return;
  }
  console.log(wallet);
  xmtp = await Client.create(wallet, { env: "production" });
  console.log("Client created", xmtp.address);
}

//Check if an address is on the network
async function check_if_an_address_is_on_the_network() {
  //Message this XMTP message bot to get an immediate automated reply:
  //gm.xmtp.eth (0x937C0d4a6294cdfa575de17382c7076b579DC176) env:production
  //
  WALLET_TO = "0x6588A930Ed24e5Cee498AAc0b5Fa6567ca914FAa";
  if (xmtp) {
    const isOnDevNetwork = await xmtp.canMessage(WALLET_TO);
    console.log(`Can message: ${isOnDevNetwork}`);
    return isOnDevNetwork;
  }
  return false;
}

//Start a new conversation
async function start_a_new_conversation() {
  const canMessage = await check_if_an_address_is_on_the_network();
  if (!canMessage) {
    console.log("Cannot message this address. Exiting...");
    return;
  }

  if (xmtp) {
    conversation = await xmtp.conversations.newConversation(WALLET_TO);
    console.log(`Conversation created with ${conversation.peerAddress}`);
  }
}

//Send a message
async function send_a_message(messageContent: string) {
  if (conversation) {
    const message = await conversation.send(messageContent);
    console.log(`Message sent: "${message.content}"`);
    return message;
  }
}

// Stream all messages from all conversations
// async function stream_all_messages() {
//     printQrCode()
//     if (xmtp) {
//         for await (const message of await xmtp.conversations.streamAllMessages()) {
//             console.log(`New message from ${message.senderAddress}: ${message.content}`);
//         }
//     }
// }

// function printQrCode() {
//     //Use coinbase wallet to send a message
//     qrcode.generate(`https://go.cb-w.com/messaging?address=${wallet?.address}`)
// }

// Run the functions

//await stream_all_messages()
