export default function SupportedNetworks() {
  const supportedNetworks = [
    'ethereum',
    'binance smart chain',
    'polygon',
    'arbitrum',
    'optimism',
    'avalanche',
    'base',
    'fantom',
    'zksync',
    'scroll',
    'linea',
    'mantle',
    'blast',
    'metis',
    'core',
    'celo',
    'moonbeam',
    'cronos',
    'aurora',
    'opbnb',
    'taiko',
    'hedera',
    'sui',
    'stellar',
    'pi'
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full mx-auto overflow-hidden">
      <div className="relative mt-5 w-[95%]  overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_15%,black_85%,transparent_100%)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-3 py-1 text-primary rounded-2xl backdrop-blur-sm bg-background  shadow-xl">
          <h5 className="text-xl font-bold capitalize text-center whitespace-nowrap ">
            Coming soon on
          </h5>
        </div>
        <div className="relative overflow-hidden py-3">
          <div className="absolute inset-0 z-10 backdrop-blur-[1px] bg-white/20 pointer-events-none"></div>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_15%,black_85%,transparent_100%)]">
            <div className="flex animate-infinite-scroll opacity-40">
              {supportedNetworks.map((network, index) => (
                <div
                  key={`first-${network}-${index}`}
                  className="flex-shrink-0 min-w-[140px] pointer-events-none h-10 mx-1.5 rounded-xl bg-primary text-background text-sm font-medium text-center leading-10 capitalize shadow-sm blur-[0.5px]"
                >
                  {network}
                </div>
              ))}
              {supportedNetworks.map((network, index) => (
                <div
                  key={`second-${network}-${index}`}
                  className="flex-shrink-0 min-w-[140px] pointer-events-none h-10 mx-1.5 rounded-xl bg-primary text-background text-sm font-medium text-center leading-10 capitalize shadow-sm blur-[0.5px]"
                >
                  {network}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}