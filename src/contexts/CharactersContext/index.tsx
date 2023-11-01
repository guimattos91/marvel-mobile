import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Api from 'services/Api';

import { CharacterType } from 'types/CharacterType';

interface IContextProps {
  characters: CharacterType[];
  error: string | null;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  fetchCharacters: (page: number, search?: string) => Promise<void>;
}

interface ICharactersProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const CharactersProvider: React.FC<ICharactersProviderProps> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 24;

  const fetchCharacters = useCallback(async (page: number, search?: string) => {
    const offset = (page - 1) * limit;
    setIsLoading(true);
    setError(null);

    const params = {
      offset,
      limit,
      nameStartsWith: search?.length ? search : undefined,
    };

    try {
      const response = await Api.get('/characters', { params });
      setCurrentPage(page);
      // eslint-disable-next-line arrow-parens
      setCharacters(prevCharacters => [
        ...prevCharacters,
        ...response.data.data.results,
      ]);
      setTotalPages(response.data.data.total / limit);
    } catch {
      setError('Erro: Personagem não encontrado');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          characters,
          isLoading,
          totalPages,
          currentPage,
          error,
          fetchCharacters,
        }),
        [
          characters,
          isLoading,
          totalPages,
          currentPage,
          error,
          fetchCharacters,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useCharacters = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useCharacters must be within CharatersProvider');
  }

  return context;
};
