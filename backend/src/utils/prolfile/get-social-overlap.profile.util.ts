import { getSocialOverlapAirstackService } from "../../services/airstack/get-social-overlap.airstack.service";
export const getSocialOverlapProfileUtil = async (
  handle1: string,
  handle2: string
) => {
  const socialOverlap = await getSocialOverlapAirstackService(handle1, handle2);
  return checkCommonSocials(socialOverlap);
};

const checkCommonSocials = (socialOverlap: any) => {
  let ens,
    lens,
    farcaster,
    xmtp: boolean = false;
  if (socialOverlap.wallet1 && socialOverlap.wallet2) {
    if (socialOverlap.wallet1.domains && socialOverlap.wallet2.domains) {
      ens = true;
    }
    if (socialOverlap.wallet1.farcasterSocials && socialOverlap.wallet2.farcasterSocials) {
      farcaster = true;
    }
    if (socialOverlap.wallet1.lensSocials && socialOverlap.wallet2.lensSocials) {
      lens = true;
    }
    if (socialOverlap.wallet1.xmtp && socialOverlap.wallet2.xmtp) {
      xmtp = true;
    }
  }

  return { ens, lens, farcaster, xmtp };
};
