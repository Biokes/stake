import React, { useEffect, useRef } from 'react';

export default function SupportedNetworks() {
  const supportedNetworks: string[] = [
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

  const networksLoop = [...supportedNetworks, ...supportedNetworks];
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let start = 0;
    const speed = 0.5;
    const totalWidth = list.scrollWidth / 2;

    function animate() {
      start -= speed;
      if (Math.abs(start) >= totalWidth) start = 0;
      list!.style.transform = `translateX(${start}px)`;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: '0 auto',
        overflow: 'hidden',
        padding: '2rem 0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1.5rem',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h3
          style={{
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 600,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Coming Soon on All Chains
        </h3>
      </div>

     <div
        style={{
          marginTop: '4rem',
          width: '100%',
          borderRadius: '1rem',
          border: '1px solid rgba(0,0,0,0.1)',
          background: 'rgba(0, 120, 255, 0.05)',
          padding: '1rem',
          overflow: 'hidden',
        }}
      >
        <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
          <h5
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#0078ff',
              textTransform: 'capitalize',
            }}
          >
            Supported Networks
          </h5>
        </div>
       <ul
          ref={listRef}
          style={{
            display: 'flex',
            gap: '0.75rem',
            whiteSpace: 'nowrap',
            padding: '0.75rem 0',
            margin: 0,
            listStyle: 'none',
            transform: 'translateX(0)',
          }}
        >
          {networksLoop.map((text, index) => (
            <li
              key={`${text}-${index}`}
              style={{
                flex: '0 0 auto',
                minWidth: '120px',
                height: '40px',
                borderRadius: '0.75rem',
                background: 'rgba(0,120,255,0.2)',
                color: '#0078ff',
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: '40px',
                textTransform: 'capitalize',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
