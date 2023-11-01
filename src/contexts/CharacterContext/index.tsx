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
  character: CharacterType | null;
  error: string | null;
  isLoading: boolean;
  fetchCharacter: (id: number | string) => Promise<void>;
}

interface ICharactersProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const CharacterProvider: React.FC<ICharactersProviderProps> = ({
  children,
}) => {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = useCallback(async (id: number | string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Api.get(`/characters/${id}`);
      setCharacter(response.data.data.results[0]);
    } catch {
      setError('Error: Character not found');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          character,
          isLoading,
          error,
          fetchCharacter,
        }),
        [character, isLoading, error, fetchCharacter],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useCharacter = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useCharacters must be within CharatersProvider');
  }

  return context;
};
