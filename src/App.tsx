import CharactersTable from './components/CharactersTable';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import useApi from './hooks/useApi';
import { useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

function App() {
  const [search, setSearch] = useState('');
  const { items, loading, error, updatePage } = useApi(search);
  const { containerRef, containerBottomRef } = useInfiniteScroll(updatePage);

  // Debounce for half a second
  const handleChangeSearch = useMemo(() => debounce(setSearch, 500, { leading: false }), []);

  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>Rick and Morty characters</h1>
      <input
        className="rnm__search-field"
        placeholder="Search"
        type="search"
        onChange={(e) => handleChangeSearch(e.target.value)}
      />
      <CharactersTable
        ref={containerRef}
        bottomRef={containerBottomRef}
        characters={items}
        loading={loading}
      />
    </div>
  );
}

export default App;
