export interface SimilarityResponseAppModel {
  similarityScore: number;
  haveENS: boolean;
  haveLens: boolean;
  haveFarcaster: boolean;
  haveXMPT: boolean;
  poapCount: number;
  poapDetails: {
    Poap: {
      id: string;
      blockchain: string;
      tokenId: string;
      tokenAddress: string;
      poapEvent: {
        city: string;
        eventName: string;
        startDate: string;
        eventId: string;
        logo: {
          image: {
            small: string;
            medium: string;
          };
        };
      };
    }[];
  };
}
