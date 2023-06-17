import { forwardRef, ForwardedRef } from 'react';
import { Character } from '../types/common';

interface CharactersTableProps {
  characters?: Character[];
  loading?: boolean;
  bottomRef: ForwardedRef<HTMLDivElement>;
}

const CharactersTable = forwardRef<HTMLTableElement, CharactersTableProps>(
  ({ characters, loading, bottomRef }, ref) => {
    return (
      <>
        <table ref={ref}>
          <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Species</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {characters?.map((character) => (
            <tr key={character.id}>
              <td>{character.name}</td>
              <td>
                <img
                  className="rnm__character-img"
                  src={character.image}
                  alt={character.name}
                />
              </td>
              <td>{character.species}</td>
              <td>{character.status}</td>
            </tr>
          ))}
          </tbody>
        </table>
        {loading && <div className="rnm__update-block">Updating...</div>}
        <div ref={bottomRef} />
      </>
    );
  }
);

export default CharactersTable;
