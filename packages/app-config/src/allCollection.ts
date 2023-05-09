// import { isProd } from '../utils/env';

const isProd = true;
const ICPIcon = '/icp.png';
const GHOSTIcon = '/ghost.png';
const DOGMIIcon = '/dogmi.png';
const NDPIcon = '/nnsdao.png';

// priority 1e3 1e2 1e1 9-0
const collections: Array<collectionsItem> = [
  {
    canister: 'vcpye-qyaaa-aaaak-qafjq-cai',
    priority: 1e3,
    mintNft: 10000,
    name: 'Starfish',
    brief: 'The Unstoppable Power of Leaderless Organizations.',
    description:
      'The forces of disorder are advancing, and starfish-like organizations are forming new circles, gradually moving toward decentralization.',
    blurb: `<p>
        This is a starfish culture, NnsDAO creates a non-hierarchical structure of DAOn from the organizational model,
        and the touchstone figure who initiates DAOs leads the trend and brings together members of DAOs who share
        common values and beliefs, and communicate and improve themselves within DAOs, each for themselves, and DAOs are
        advancing new ideas as executors and passionate defenders of new ideas. We hope that by providing some basic DAO
        tools, more people will join and redefine the organizational model.
      </p>`,
    keywords: 'Nnsdao Starfish DAOs',
    web: 'https://nnsdao.org/',
    distrikt: '',
    dscvr: '',
    figma: '',
    icrocks: 'https://icscan.io/nft/collection/vcpye-qyaaa-aaaak-qafjq-cai',
    notion: '',
    telegram: 'https://t.me/NnsDaos',
    discord: 'https://discord.gg/UTZvcDkeDr',
    twitter: 'https://twitter.com/NnsDaos',
    medium: 'https://nnsdao.medium.com/',
    banner: '/collections/starfish/starfish_banner.jpg',
    marketCover: '/collections/starfish/cover.jpg',
    bigBanner: '/collections/starfish/starfish_banner.jpg',
    blackMotif: false,
    avatar: '/collections/starfish/avatar.jpg',
    collection: '/collections/starfish/cover.jpg',
    route: 'NnsDAO',
    commission: 0.1,
    comaddress: '',
    unit: 'NFT',
    nftv: true,
    mature: false,
    market: true,
    filter: false,
    supportTokens: [
      {
        token: 'ICP',
        icon: ICPIcon,
        min: 0.01,
        max: 1e10
      },
      {
        token: 'NDP',
        icon: NDPIcon,
        min: 1e3,
        max: 1e10,
        standard: 'DIP20',
        cid: 'vgqnj-miaaa-aaaal-qaapa-cai'
      }
    ]
  },
  {
    canister: 'ah2fs-fqaaa-aaaak-aalya-cai',
    priority: 10,
    name: 'POD',
    brief: 'POD: distrikt vessels that uphold the power of the metaverse',
    mintNft: 10000,
    description:
      'The distrikt POD collection is made up of 10,000 vessels that will traverse the IC ecosystem. They’ve made contact with a single-minded purpose: safeguard the keys to an elevated experience for true distrikters. Your POD contains multitudes and shelters unlimited potential. When you hold a distrikt POD you hold the key to unlock experiences in multiple dimensions, available only to the initiated.',
    blurb:
      'The distrikt POD collection is made up of 10,000 vessels that will traverse the IC ecosystem. They’ve made contact with a single-minded purpose: safeguard the keys to an elevated experience for true distrikters. Your POD contains multitudes and shelters unlimited potential. When you hold a distrikt POD you hold the key to unlock experiences in multiple dimensions, available only to the initiated.',
    keywords: 'Distrikt, POD, social, podsnft, metaverse, vessels',
    web: 'http://distrikt.app',
    discord: 'https://discord.gg/DvhDcZMdCb',
    twitter: 'https://twitter.com/DistriktApp',
    medium: 'https://medium.com/distrikt',
    route: 'distrikt',
    unit: 'NFTs',
    distrikt: '',
    commission: 0.01,
    dscvr: '',
    figma: '',
    icrocks: 'https://icscan.io/nft/collection/ah2fs-fqaaa-aaaak-aalya-cai',
    notion: '',
    telegram: 'https://t.me/DistriktApp',
    banner: '/collections/distrikt/banner_collection.jpg',
    marketCover: '/collections/distrikt/cover.jpg',
    bigBanner: '/collections/distrikt/banner_collection.jpg',
    blackMotif: false,
    avatar: '/collections/distrikt/avatar.jpg',
    collection: '/collections/distrikt/cover.jpg',
    comaddress: '',
    nftv: false,
    mature: false,
    market: true,
    filter: false,
    supportTokens: [
      {
        token: 'ICP',
        min: 0.01,
        max: 1e10,
        icon: ICPIcon
      },
      {
        token: 'GHOST',
        min: 1500,
        max: 1e10,
        icon: GHOSTIcon,
        standard: 'EXT',
        cid: 'fjbi2-fyaaa-aaaan-qanjq-cai'
      },
      // {
      //   token: 'DOGMI',
      //   min: 1500,
      //   max: 1e10,
      //   icon: DOGMIIcon,
      //   standard: 'EXT',
      //   cid: 'ltire-ryaaa-aaaan-qautq-cai',
      // },
      {
        token: 'NDP',
        min: 1e3,
        max: 1e10,
        icon: NDPIcon,
        standard: 'DIP20',
        cid: 'vgqnj-miaaa-aaaal-qaapa-cai'
      }
    ]
  },
  // {
  //   canister: 'xzcnc-myaaa-aaaak-abk7a-cai',
  //   priority: 10,
  //   mintNft: 10000,
  //   unit: 'NFTs',
  //   name: 'IC Ghost',
  //   brief: 'IC Ghost - Enter the dino-verse.',
  //   description:
  //     'IC Ghost is one of the first Meme Token of the Dfinity ecosystem. The collection of 10K NFT was entirely generated from pixel drawings by the team behind IC Ghost - ICPLINK.The GHOST forever belongs to the ICP ecosystem; feel free to use IC Ghost in any way you want.',
  //   blurb:
  //     'IC Ghost is one of the first Meme Token of the Dfinity ecosystem. The collection of 10K NFT was entirely generated from pixel drawings by the team behind IC Ghost - ICPLINK.The GHOST forever belongs to the ICP ecosystem; feel free to use IC Ghost in any way you want.',
  //   keywords: 'Ghost memetoken icpswap nft',
  //   web: 'https://yadjb-mqaaa-aaaan-qaqlq-cai.raw.ic0.app/',
  //   icrocks: 'https://rocks.icpscan.co/principal/xzcnc-myaaa-aaaak-abk7a-cai',
  //   discord: '',
  //   twitter: 'https://twitter.com/IcpLink',
  //   medium: '',
  //   route: 'icghost',
  //   commission: 0.01,
  //   distrikt: '',
  //   dscvr: '',
  //   figma: '',
  //   notion: '',
  //   telegram: '',
  //   banner: '/collections/icghost/banner.jpg',
  //   marketCover: '/collections/icghost/cover.jpg',
  //   bigBanner: '/collections/icghost/banner.jpg',
  //   blackMotif: false,
  //   avatar: '/collections/icghost/avatar.jpg',
  //   collection: '/collections/icghost/cover.jpg',
  //   comaddress: '',
  //   nftv: false,
  //   mature: false,
  //   market: true,
  //   filter: false,
  //   supportTokens: [
  //     {
  //       token: 'ICP',
  //       min: 0.01,
  //       max: 1e10,
  //     },
  //     {
  //       token: 'GHOST',
  //       min: 1,
  //       max: 1e10,
  //       standard: 'EXT',
  //       cid: 'fjbi2-fyaaa-aaaan-qanjq-cai',
  //     },
  //     // {
  //     //   token: 'NDP',
  //     //   min: 10,
  //     //   max: 1e10,
  //     //   standard: 'DIP20',
  //     //   cid: 'vgqnj-miaaa-aaaal-qaapa-cai',
  //     // },
  //   ],
  // },
  {
    mintNft: 6666,
    unit: 'NFTs',
    distrikt: '',
    dscvr: '',
    figma: '',
    icrocks: 'https://icscan.io/nft/collection/2tvxo-eqaaa-aaaai-acjla-cai',
    notion: '',
    marketCover: '/collections/icwhale/avatar.jpg',
    bigBanner: '/collections/icwhale/banner.jpg',
    blackMotif: false,
    priority: 8,
    name: 'Whale',
    blurb:
      '<p>Dream Whale is a public welfare project. Whale nft is given to ocean conservation enthusiasts in the form of airdrop to promote marine ecological protection.</p>',
    medium: '',
    canister: '2tvxo-eqaaa-aaaai-acjla-cai',
    brief:
      '6666 Pure hand-painted, dreaming, freedom-loving, peace-loving whale, living on the Internet computer.',
    description:
      'Dream Whale is a public welfare project. Whale nft is given to ocean conservation enthusiasts in the form of airdrop to promote marine ecological protection.',
    keywords: 'Health frontline covid-19',
    web: 'https://f5omc-taaaa-aaaai-acaqq-cai.ic0.app/',
    discord: 'https://discord.com/invite/HAJPBpDRNx',
    twitter: 'https://twitter.com/ic_whale',
    telegram: '',
    banner: '/collections/icwhale/banner.jpg',
    avatar: '/collections/icwhale/avatar.jpg',
    collection: '/collections/icwhale/cover.jpg',
    route: 'Whale',
    commission: 0.05,
    comaddress: '',
    nftv: false,
    mature: false,
    market: true,
    filter: false,
    supportTokens: [
      {
        token: 'ICP',
        min: 0.01,
        max: 1e10,
        icon: ICPIcon
      },
      {
        token: 'GHOST',
        min: 1500,
        max: 1e10,
        icon: GHOSTIcon,
        standard: 'EXT',
        cid: 'fjbi2-fyaaa-aaaan-qanjq-cai'
      },
      // {
      //   token: 'DOGMI',
      //   min: 1500,
      //   max: 1e8,
      //   icon: DOGMIIcon,
      //   standard: 'EXT',
      //   cid: 'ltire-ryaaa-aaaan-qautq-cai',
      // },
      {
        token: 'NDP',
        min: 1e3,
        max: 1e10,
        icon: NDPIcon,
        standard: 'DIP20',
        cid: 'vgqnj-miaaa-aaaal-qaapa-cai'
      }
    ]
  },
  {
    mintNft: 10000,
    unit: 'NFTs',
    distrikt: '',
    dscvr: '',
    figma: '',
    icrocks: isProd
      ? 'https://icscan.io/nft/collection/yscul-uaaaa-aaaao-aagxa-cai'
      : 'https://icscan.io/nft/collection/yscul-uaaaa-aaaao-aagxa-cai',
    notion: '',
    marketCover: '/collections/ballshit/ballshit.jpg',
    bigBanner: '/collections/ballshit/starfish_banner.jpg',
    blackMotif: false,
    priority: 14,
    name: 'Ballshit',
    blurb: '<p>Call me Ball Shit.</p>',
    medium: '',
    canister: isProd ? 'yscul-uaaaa-aaaao-aagxa-cai' : 'yscul-uaaaa-aaaao-aagxa-cai',
    brief: 'A performance art of ballshit.',
    description:
      'Each sphere is calculated with high precision by ray tracing each pixel to show the most realistic indirect light effects, including clear reflections, refractions and shadows between objects with different roughness.',
    keywords: 'ballshit nnsdao ndp',
    web: '',
    discord: '',
    twitter: '',
    telegram: '',
    banner: '/collections/ballshit/starfish_banner.jpg',
    avatar: '/collections/ballshit/ballshit.jpg',
    collection: '/collections/ballshit/ballshit.jpg',
    route: 'ballshit',
    commission: 0.04,
    comaddress: '',
    nftv: false,
    mature: false,
    market: true,
    filter: false,
    supportTokens: [
      {
        token: 'ICP',
        min: 0.01,
        max: 1e10,
        icon: ICPIcon
      },
      {
        token: 'GHOST',
        min: 1500,
        max: 1e10,
        icon: GHOSTIcon,
        standard: 'EXT',
        cid: 'fjbi2-fyaaa-aaaan-qanjq-cai'
      },
      // {
      //   token: 'DOGMI',
      //   min: 1500,
      //   max: 1e10,
      //   icon: DOGMIIcon,
      //   standard: 'EXT',
      //   cid: 'ltire-ryaaa-aaaan-qautq-cai',
      // },
      {
        token: 'NDP',
        min: 1e3,
        max: 1e10,
        icon: NDPIcon,
        standard: 'DIP20',
        cid: 'vgqnj-miaaa-aaaal-qaapa-cai'
      }
    ]
  },
  {
    mintNft: 9999,
    unit: 'NFTs',
    distrikt: '',
    dscvr: '',
    figma: '',
    icrocks: 'https://icscan.io/nft/collection/slzze-ciaaa-aaaah-aa7ra-cai',
    notion: '',
    marketCover: '/collections/moraplanet/avatar.png',
    bigBanner: '/collections/moraplanet/banner.png',
    blackMotif: false,
    priority: 15,
    name: 'Mora',
    blurb:
      '<p>A total of 5 series,9999 planet NFTs. The five series are Buddha,Machine,Fantasy,Explosion,and Virus.</p>',
    medium: 'https://medium.com/@DstarApp',
    canister: 'slzze-ciaaa-aaaah-aa7ra-cai',
    brief: 'A total of 5 series,9999 planet NFTs.',
    description:
      'A total of 5 series,9999 planet NFTs. The five series are Buddha,Machine,Fantasy,Explosion,and Virus.',
    keywords: 'DstarApp Mora Planet',
    web: 'https://mora.city/',
    discord: 'https://discord.com/invite/5dx2rKSra3',
    twitter: 'https://twitter.com/Mora_App',
    telegram: '',
    banner: '/collections/moraplanet/banner.png',
    avatar: '/collections/moraplanet/avatar.png',
    collection: '/collections/moraplanet/cover.png',
    route: 'Mora',
    commission: 0.03,
    comaddress: '',
    nftv: false,
    mature: false,
    market: true,
    filter: false,
    supportTokens: [
      {
        token: 'ICP',
        min: 0.01,
        max: 1e10,
        icon: ICPIcon
      },
      {
        token: 'GHOST',
        min: 1500,
        icon: GHOSTIcon,
        max: 1e10,
        standard: 'EXT',
        cid: 'fjbi2-fyaaa-aaaan-qanjq-cai'
      },
      {
        token: 'NDP',
        min: 1e3,
        max: 1e10,
        icon: NDPIcon,
        standard: 'DIP20',
        cid: 'vgqnj-miaaa-aaaal-qaapa-cai'
      }
      // {
      //   token: 'DOGMI',
      //   min: 1500,
      //   max: 1e8,
      //   icon: DOGMIIcon,
      //   standard: 'EXT',
      //   cid: 'ltire-ryaaa-aaaan-qautq-cai',
      // },
    ]
  },
  {
    mintNft: 4444,
    unit: 'NFTs',
    distrikt: '',
    dscvr: '',
    figma: '',
    icrocks: 'https://icscan.io/nft/collection/556r5-uqaaa-aaaah-qcz7q-cai',
    notion: '',
    marketCover: '/collections/dragonz/avatar.jpg',
    bigBanner: '/collections/dragonz/banner.png',
    blackMotif: false,
    priority: 15,
    name: 'Dragonz DAO',
    blurb:
      '<p>Dfinity Dragonz is an NFT collection of 4444 Meka Dragonz living on the Internet Computer Blockchain. Each Dragon represents one vote for the proposals in the Council. In this completely community-based project, all decisions come into effect with the votes of Dfinity Dragonz holders. Also for the Valley Treasury to be created for this council, all decisions will be completed by this voting system.</p>',
    medium: '',
    canister: '556r5-uqaaa-aaaah-qcz7q-cai',
    brief:
      'Dfinity Dragonz is an NFT collection of 4444 Meka Dragonz living on the Internet Computer Blockchain.',
    description:
      'Dfinity Dragonz is an NFT collection of 4444 Meka Dragonz living on the Internet Computer Blockchain. Each Dragon represents one vote for the proposals in the Council. In this completely community-based project, all decisions come into effect with the votes of Dfinity Dragonz holders. Also for the Valley Treasury to be created for this council, all decisions will be completed by this voting system.',
    keywords: 'Dfinity Dragonz Nnsdao dao',
    web: 'https://nyph3-wyaaa-aaaap-aaaaa-cai.ic0.app/',
    discord: 'https://discord.com/invite/YfGBHNAKdF',
    twitter: 'https://twitter.com/dfinitydragon',
    telegram: '',
    banner: '/collections/dragonz/banner.png',
    avatar: '/collections/dragonz/avatar.jpg',
    collection: '/collections/dragonz/cover.jpg',
    route: 'dragonz',
    commission: 0.05,
    comaddress: '',
    nftv: false,
    mature: false,
    market: true,
    filter: false,
    supportTokens: [
      {
        token: 'ICP',
        min: 0.01,
        max: 1e10,
        icon: ICPIcon
      },
      {
        token: 'GHOST',
        icon: GHOSTIcon,
        min: 1500,
        max: 1e10,
        standard: 'EXT',
        cid: 'fjbi2-fyaaa-aaaan-qanjq-cai'
      },
      // {
      //   token: 'DOGMI',
      //   min: 1500,
      //   max: 1e8,
      //   standard: 'EXT',
      //   icon: DOGMIIcon,
      //   cid: 'ltire-ryaaa-aaaan-qautq-cai',
      // },
      {
        token: 'NDP',
        min: 1e3,
        max: 1e10,
        icon: NDPIcon,
        standard: 'DIP20',
        cid: 'vgqnj-miaaa-aaaal-qaapa-cai'
      }
    ]
  },
  {
    mintNft: 3969,
    unit: 'NFTs',
    distrikt: '',
    dscvr: '',
    figma: '',
    icrocks: 'https://icscan.io/nft/collection/y5prr-fiaaa-aaaam-qagga-cai',
    notion: '',
    marketCover: '/collections/dogfinity/avatar.png',
    bigBanner: '/collections/dogfinity/banner.png',
    blackMotif: false,
    priority: 15,
    name: 'DogFinity',
    blurb:
      '<p>DogFinity = Community Membership + Movement for the IC + Web3 Brand Are you early to Web3? Community: Join the Early Dogs by acquiring one or more of the exclusive 3969 DogFinity NFTs. Our efforts are directed at gathering the top minds and biggest advocates of the IC. Movement: A movement for the IC, a movement for Web3. Through DogFinity, we are growing Internet Computer awareness and adoption. Brand: The brand goes beyond the DogFinity merch. Expect to see the DogFinity visual identity and name in every campaign of the movement.</p>',
    medium: '',
    canister: 'y5prr-fiaaa-aaaam-qagga-cai',
    brief:
      'DogFinity = Community Membership + Movement for the IC + Web3 Brand Are you early to Web3?',
    description:
      'DogFinity = Community Membership + Movement for the IC + Web3 Brand Are you early to Web3? Community: Join the Early Dogs by acquiring one or more of the exclusive 3969 DogFinity NFTs. Our efforts are directed at gathering the top minds and biggest advocates of the IC. Movement: A movement for the IC, a movement for Web3. Through DogFinity, we are growing Internet Computer awareness and adoption. Brand: The brand goes beyond the DogFinity merch. Expect to see the DogFinity visual identity and name in every campaign of the movement.',
    keywords: 'Dfinity DogFinity Nnsdao dao',
    web: '',
    discord: 'https://discord.com/invite/r3MQdFNTyA',
    twitter: 'https://twitter.com/dogfinity',
    telegram: '',
    banner: '/collections/dogfinity/banner.png',
    avatar: '/collections/dogfinity/avatar.png',
    collection: '/collections/dogfinity/cover.png',
    route: 'dogfinity',
    commission: 0.035,
    comaddress: '',
    nftv: false,
    mature: false,
    market: true,
    filter: false,
    supportTokens: [
      {
        token: 'ICP',
        min: 0.01,
        max: 1e8,
        icon: ICPIcon
      },
      {
        token: 'GHOST',
        min: 1500,
        icon: GHOSTIcon,
        max: 1e8,
        standard: 'EXT',
        cid: 'fjbi2-fyaaa-aaaan-qanjq-cai'
      },
      // {
      //   token: 'DOGMI',
      //   min: 1500,
      //   max: 1e8,
      //   standard: 'EXT',
      //   icon: DOGMIIcon,
      //   cid: 'ltire-ryaaa-aaaan-qautq-cai',
      // },
      {
        token: 'NDP',
        min: 1e3,
        max: 1e10,
        icon: NDPIcon,
        standard: 'DIP20',
        cid: 'vgqnj-miaaa-aaaal-qaapa-cai'
      }
    ]
  },
  {
    mintNft: 69,
    unit: 'NFTs',
    distrikt: '',
    dscvr: '',
    figma: '',
    icrocks: 'https://icscan.io/nft/collection/2vd2w-riaaa-aaaam-qazpq-cai',
    notion: '',
    marketCover: '/collections/coinstarsnft/avatar.jpg',
    bigBanner: '/collections/coinstarsnft/banner.jpg',
    blackMotif: false,
    priority: 12,
    name: 'CoinStarsNFT',
    blurb:
      '<p>⭐ The Journey of the Stars!! The Legendary Crypto Currencies toggles from thier comfort zone to explore greatness of the Universe at its peak. They took the path of Dfinity, Stumbled but refused to fall. Are You all ready to embark on the journey of the Stars with these Giant Star Coins⭐? </p>',
    medium: '',
    canister: '2vd2w-riaaa-aaaam-qazpq-cai',
    brief:
      'The Journey of the Stars!! The Legendary Crypto Currencies toggles from thier comfort zone to explore greatness of the Universe at its peak.',
    description:
      '⭐ The Journey of the Stars!! The Legendary Crypto Currencies toggles from thier comfort zone to explore greatness of the Universe at its peak. They took the path of Dfinity, Stumbled but refused to fall. Are You all ready to embark on the journey of the Stars with these Giant Star Coins⭐? ',
    keywords: 'Dfinity CoinStarsNFT Nnsdao dao',
    web: '',
    twitter: 'https://twitter.com/CoinStarsNft',
    discord: 'https://discord.com/invite/84tSU54wrM',
    telegram: '',
    banner: '/collections/coinstarsnft/banner.jpg',
    avatar: '/collections/coinstarsnft/avatar.jpg',
    collection: '/collections/coinstarsnft/cover.jpg',
    route: 'coinstarsnft',
    commission: 0.09,
    comaddress: '',
    nftv: false,
    mature: false,
    market: true,
    filter: false,
    supportTokens: [
      {
        token: 'ICP',
        min: 0.01,
        max: 1e8,
        icon: ICPIcon
      },
      {
        token: 'GHOST',
        min: 1500,
        max: 1e8,
        icon: GHOSTIcon,
        standard: 'EXT',
        cid: 'fjbi2-fyaaa-aaaan-qanjq-cai'
      },
      // {
      //   token: 'DOGMI',
      //   min: 1500,
      //   max: 1e8,
      //   icon: DOGMIIcon,
      //   standard: 'EXT',
      //   cid: 'ltire-ryaaa-aaaan-qautq-cai',
      // },
      {
        token: 'NDP',
        min: 1e3,
        max: 1e10,
        icon: NDPIcon,
        standard: 'DIP20',
        cid: 'vgqnj-miaaa-aaaal-qaapa-cai'
      }
    ]
  }
];

export default collections;

export const collectionsMap = collections.reduce((acc, item) => {
  acc[item.canister] = item;

  return acc;
}, Object.create(null));

export type collectionsItem = {
  canister: string;
  priority: number;
  mintNft: number;
  name: string;
  brief: string;
  description: string;
  blurb: string;
  keywords: string;
  web: string;
  distrikt: string;
  dscvr: string;
  figma: string;
  icrocks: string;
  telegram: string;
  discord: string;
  twitter: string;
  medium: string;
  banner: string;
  notion: string;
  bigBanner: string;
  marketCover: string;
  blackMotif: boolean;
  avatar: string;
  collection: string;
  route: string;
  commission: number;
  comaddress: string;
  supportTokens: supportTokenItem[];
  unit: string;
  nftv: boolean;
  mature: boolean;
  market: boolean;
  filter: boolean;
};

export interface supportTokenItem {
  token: string;
  icon: string;
  min: number;
  max: number;
  // except icp ,other tokens must config these filed
  cid?: string;

  standard?: tokenStandardType;
}
export type tokenStandardType = 'EXT' | 'DIP20';
