import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Api from 'services/Api';

import { ComicsType } from 'types/ComicType';

interface IContextProps {
  comic: ComicsType | null;
  error: string | null;
  isLoading: boolean;
  fetchComic: (id: number) => Promise<void>;
}

interface ICComicsProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const ComicProvider: React.FC<ICComicsProviderProps> = ({
  children,
}) => {
  const [comic, setComic] = useState<ComicsType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComic = useCallback(async (id: number | string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Api.get(`/comics/${id}`);
      setComic(response.data.data.results[0]);
    } catch {
      setError('Erro: Comic não encontrado');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          comic,
          error,
          isLoading,
          fetchComic,
        }),
        [comic, error, isLoading, fetchComic],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useComic = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useComics must be within ComicsProvider');
  }

  return context;
};
