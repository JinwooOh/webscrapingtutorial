import { useEffect, useState } from 'react';
import { ScrapeProvider } from './ScrapeContext';

function useScrapes() {
  const [scrapes, setScrapes] = useState({
    twitter: [],
    instagram: [],
  });
  useEffect(function() {
    (async () => {
      console.log('Mounting or Updating');
      const res = await fetch('http://localhost:3333/data');
      const data = await res.json();
      console.log(data);
      setScrapes(data);
    })();
  }, []);

  return scrapes;
}

export default function Page({ children }) {
  const scrapes = useScrapes();
  return (
    <ScrapeProvider
      value={{
        scrapes,
      }}
    >
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
