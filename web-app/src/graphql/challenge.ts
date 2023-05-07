const challenge = `
    query Challenge($address: EthereumAddress!) {
        challenge(request: { address: $address }) {
            text
        }
    }
`;

export default challenge;


