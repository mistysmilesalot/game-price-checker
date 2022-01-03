#!/usr/bin/env node
const queries = require('../src/queries.ts')
const getExistingData = require('../src/getExistingData.ts')
const createOutputCsv = require('../src/createOutputCsv.ts')
const {ScrapeDataFromFileUrl} = require('../src/scraper')

async function main() {
  const data = (await getExistingData()) || []
  // const queriesTodo = []
  // queries.forEach((q) => {
  //   const found = data.findIndex(
  //     (d) => d.input.toLowerCase() === q.toLowerCase()
  //   )
  //   if (found >= 0) {
  //     data[found].quantity += 1
  //     console.log('Duplicate: ' + q)
  //   } else {
  //     queriesTodo.push(q)
  //   }
  // })
  const queriesTodo = [
    "https://serpapi.com/searches/81fa1fc7f6cec7b7/6152a068af63045cc424b51d.json",
    "https://serpapi.com/searches/3c1ab6c13c355c8e/6152a06829d177f89ae5dcf0.json",
    "https://serpapi.com/searches/d17ee2a3d107c15a/6152a068c573d5cd267dd4c0.json",
    "https://serpapi.com/searches/6d85532b8bd76ee3/6152a0685fc493a7ac62c484.json",
    "https://serpapi.com/searches/9f5b0df43ed6e83b/6152a0687d171af9c2e094f8.json",
    "https://serpapi.com/searches/d59885ee292c17cc/6152a06895bf928a800ed1ff.json",
    "https://serpapi.com/searches/da27565202891048/6152a0683d691974dd01ca6d.json",
    "https://serpapi.com/searches/60a504d4ba5acbb3/6152a0682c6878b802e231fe.json",
    "https://serpapi.com/searches/35e450fceeac8b7c/6152a0681baebb5c8bb279cd.json",
    "https://serpapi.com/searches/02b45ef4b949e9a7/6152a06858762b81489dd427.json",
    "https://serpapi.com/searches/353cc8d03aaa10f8/6152a068d737d713787f1094.json",
    "https://serpapi.com/searches/37b1407bacf1812e/6152a06849ecdb53a026dc27.json",
    "https://serpapi.com/searches/881faefde96b504e/6152a0682236e24da709b544.json",
    "https://serpapi.com/searches/514c1cb93b3ffbf9/6152a068a1b423c3b2ef628d.json",
    "https://serpapi.com/searches/d874da26c41320fb/6152a0687690dc8541246267.json",
    "https://serpapi.com/searches/4b37b72c6815b25b/6152a06810d744af9bb7a9fa.json",
    "https://serpapi.com/searches/9729f5c5d09f3be1/6152a06833b236153e5f5283.json",
    "https://serpapi.com/searches/42cc2783b45bdb8c/6152a068fe41d0b0b1d057c4.json",
    "https://serpapi.com/searches/cf8289a3f27e0b4b/6152a068437af2c8436f8f92.json",
    "https://serpapi.com/searches/ad7b57d9cabb7b53/6152a068aef264072ec2abeb.json",
    "https://serpapi.com/searches/7d22cea33c3a30af/6152a068ef7dda55c5af971f.json",
    "https://serpapi.com/searches/bb407b2b10c17d73/6152a068c640d2e23c91e79e.json",
    "https://serpapi.com/searches/5b8a44793f3567ea/6152a068a3f4ef087126a2ce.json",
    "https://serpapi.com/searches/5349d30e83088766/6152a068c56d93f1d7a85bb0.json",
    "https://serpapi.com/searches/b457eb33d77addb6/6152a068cace962fc42ae2e8.json",
    "https://serpapi.com/searches/fe3e83bfbd3e8d60/6152a068fa86757eafbbe558.json",
    "https://serpapi.com/searches/7954dd5781975542/6152a068f716ee976a950d1d.json",
    "https://serpapi.com/searches/16bc7bb683561b9d/6152a068d5a531b1ac92d2e6.json",
    "https://serpapi.com/searches/2607f45e08bf43f1/6152a068e0ded45bdb18f43c.json",
    "https://serpapi.com/searches/27818520dfba58ce/6152a068f8f5f73610bc441d.json",
    "https://serpapi.com/searches/3df31f537fcc07a2/6152a068f2180115b618c64d.json",
    "https://serpapi.com/searches/e3be4713db3f2f67/6152a0688cd878b0b22a96b0.json",
    "https://serpapi.com/searches/f6cc91180a7f2489/6152a06817f92327a4a2f6c4.json",
    "https://serpapi.com/searches/edf95ea2e13ea49a/6152a068f0adfb6ca3e87dba.json",
    "https://serpapi.com/searches/744b1ce60d2f0a4e/6152a0682c0844f559aff3bc.json",
    "https://serpapi.com/searches/ccb17dfbd0d5517c/6152a06837014c92f44e55fa.json",
    "https://serpapi.com/searches/c53a4a94d545ae80/6152a06818ca868cb06ef6c4.json",
    "https://serpapi.com/searches/269424ac9026ed8e/6152a068607393871f591bb1.json",
    "https://serpapi.com/searches/374489196d4001aa/6152a0681d64ea85d07ad36a.json",
    "https://serpapi.com/searches/d8f5e494b1b3f22f/6152a068e815af5fa52cf244.json",
    "https://serpapi.com/searches/be6f1b08d45adeb2/6152a0682f542eab932e38c6.json",
    "https://serpapi.com/searches/ce762c4a93637e89/6152a068216a9d2db95340d0.json",
    "https://serpapi.com/searches/3221da26603b22a1/6152a068e93ff4d3c9903337.json",
    "https://serpapi.com/searches/582df13fc504ea9f/6152a0689f55b30f57854f7d.json",
    "https://serpapi.com/searches/f3501452b8a3e6b7/6152a068c9de45460839fea1.json",
    "https://serpapi.com/searches/41ec256689e8cb47/6152a068033e94f568351b75.json",
    "https://serpapi.com/searches/15e3abb6f0c89d4d/6152a0683d69197447b38866.json",
    "https://serpapi.com/searches/fa8415301a4b2e58/6152a068b7b1cc137ea7110c.json",
    "https://serpapi.com/searches/54b96623a51c6f9f/6152a0688ccee0077226a2a1.json",
    "https://serpapi.com/searches/1feba6bcd218a9ec/6152a068c47d3c6f9525df15.json",
    "https://serpapi.com/searches/5357f3ae289ab797/6152a068654a8c7a6b0fac94.json",
    "https://serpapi.com/searches/51b1ec8bb8e9dd69/6152a068969c084dbe7471d3.json",
    "https://serpapi.com/searches/ab8cfbb3d4023c90/6152a0682e7d6b03ad533940.json",
    "https://serpapi.com/searches/03cef7f3983459a3/6152a0681c450a3d174578b2.json",
    "https://serpapi.com/searches/752a2ded878316dd/6152a06758762b81489dd426.json",
    "https://serpapi.com/searches/42f46267977be2d7/6152a0673c3fb212f366c27f.json",
    "https://serpapi.com/searches/0a9bdd89aaff4bb4/6152a067629a01205a837894.json",
    "https://serpapi.com/searches/7626e00dc9d7c603/6152a0675fc493a7ac62c483.json",
    "https://serpapi.com/searches/9b5d960d4606ff98/6152a0672ff421ff980bcad9.json",
    "https://serpapi.com/searches/9be3dd4006b7cad5/6152a0677690dc8541246266.json",
    "https://serpapi.com/searches/660eab86b996654e/6152a067c504e959abb1e6c8.json",
    "https://serpapi.com/searches/751d48eb5b49a171/61529c62e4a23d5a7d68440c.json",
    "https://serpapi.com/searches/800ea3d8a64adc84/61529c5edefa13aefe653d93.json",
    "https://serpapi.com/searches/ae471a45624634b2/61529af3b5961ef8c988aeff.json",
    "https://serpapi.com/searches/b6e1015bbbbcc591/61527fce607393868a891aaa.json",
    "https://serpapi.com/searches/dc3aa33c922d0b95/61527e4911c881e1c2dbd26f.json",
    "https://serpapi.com/searches/f058b97051a6cbcb/615275814b91ebf8777fd4c2.json",
    "https://serpapi.com/searches/a69a7103e854b932/61526633e815af5fa52cec4d.json",
    "https://serpapi.com/searches/a69a7103e854b932/61526633d5b1c5ee5188fdc1.json",
    "https://serpapi.com/searches/a69a7103e854b932/61526633a3f4ef07cb2b2f02.json",
    "https://serpapi.com/searches/a69a7103e854b932/615266331d986efba969c046.json",
    "https://serpapi.com/searches/a69a7103e854b932/61526633fdca3edacbd6e426.json",
    "https://serpapi.com/searches/a69a7103e854b932/615266330a90c7f0a3fb8173.json",
    "https://serpapi.com/searches/a69a7103e854b932/615266333c3fb212f366bcb0.json",
    "https://serpapi.com/searches/a69a7103e854b932/615266338cd878b0b22a904c.json",
    "https://serpapi.com/searches/a69a7103e854b932/615266333a218a64dca4b457.json",
    "https://serpapi.com/searches/a69a7103e854b932/6152663334ff95d38f1a4d6d.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc124e88ebbfd59d6f3.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc1ea1442458669c203.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc1c90e0aa86ea84fb0.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc114b24555866fe6ba.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc19bddf76ab3bbf7ce.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc1a5ad6d064c5abd88.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc19c449d5c60637703.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc18cd878d5047e7a92.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc147ccf149d307c828.json",
    "https://serpapi.com/searches/a69a7103e854b932/61518bc1e93ff40a339815b4.json",
    "https://serpapi.com/searches/a69a7103e854b932/6150b2dc2e7d6b1e7f4033b0.json",
    "https://serpapi.com/searches/dc3aa33c922d0b95/6150b2d1216a9d5d9f00648a.json",
    "https://serpapi.com/searches/dc3aa33c922d0b95/614d94e9cace96c3f0d83637.json",
    "https://serpapi.com/searches/ce646a32faac8a4c/614d8ff02ff42192187b3b54.json",
    "https://serpapi.com/searches/800ea3d8a64adc84/614d8c8114b245cc17a0e83b.json",
    "https://serpapi.com/searches/5752080954e8d260/614d71712f542e3e0f56d9c3.json",
    "https://serpapi.com/searches/a20cfa91a066d824/614d71237d171a9709a15d9a.json",
    "https://serpapi.com/searches/b83e77efc51d4713/614d70b7f716ee1ef592f2d8.json",
    "https://serpapi.com/searches/8fcd991175f22498/614d6eaa1e803facd419ddd9.json",
    "https://serpapi.com/searches/5a77efe34ffbbc86/614d6ce43824275177c38a26.json",
    "https://serpapi.com/searches/a69a7103e854b932/614d6bbf36e6a968e8f36460.json",
    "https://serpapi.com/searches/024f14663b4d32da/614d6b2e4055aa7d849fd716.json",
    "https://serpapi.com/searches/d09199373dd44971/614d6a90eb690fe0caa5fd23.json"
]

  const actions = queriesTodo.map(ScrapeDataFromFileUrl)
  Promise.all(actions).then((scrapedData) => {
    createOutputCsv(data.concat(scrapedData))
  })
}

main()
