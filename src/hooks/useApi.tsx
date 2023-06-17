import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CHARACTERS_QUERY } from '../queries';
import { Character } from '../types/common';

interface CharactersData {
  characters: {
    results: Character[];
    info: {
      next: number;
    };
  };
}

const useApi = (search: string): {
  items?: Character[];
  loading: boolean;
  error?: { message: string };
  updatePage: () => void;
} => {
  const [params, setParams] = useState({ page: 1, search: '' });
  const { data, loading, error } = useQuery<CharactersData>(CHARACTERS_QUERY, {
    variables: {
      page: params.page,
      filter: { name: params.search.toLowerCase() }
    }
  });
  const { results, info } = data?.characters || {};
  const [items, setItems] = useState<Character[]>([]);

  useEffect(() => {
    // Reset items and params when search has changed
    setItems([]);
    setParams({ page: 1, search });
  }, [search]);

  useEffect(() => {
    // Append new page of data to the state
    if (results) {
      setItems(prev => [...prev, ...results]);
    }
  }, [results]);

  // Use info.next value to load next page. This function is used in the useInfiniteScroll
  const updatePage = useCallback(() => setParams(
      prev => ({ ...prev, page: info?.next ? info.next : prev.page })),
    [info?.next]
  );

  return { items, loading, error, updatePage };
};

export default useApi;
