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
  comics: ComicsType[];
  error: string | null;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  fetchComics: (page: number, search?: string) => Promise<void>;
}

interface ICComicsProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const ComicsProvider: React.FC<ICComicsProviderProps> = ({
  children,
}) => {
  const [comics, setComics] = useState<ComicsType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchComics = useCallback(async (page: number, search?: string) => {
    const limit = 24;
    const offset = (page - 1) * limit;

    setCurrentPage(page);
    setIsLoading(true);
    setError(null);

    const params = {
      offset,
      limit,
      titleStartsWith: search?.length ? search : undefined,
    };

    try {
      const {
        data: {
          data: { results, total },
        },
      } = await Api.get('/comics', { params });
      // eslint-disable-next-line prettier/prettier
      setComics((prevComics) => [...prevComics, ...results]);
      setTotalPages(Math.ceil(total / limit));
    } catch {
      setError('Error: Comic not Found');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          comics,
          error,
          isLoading,
          totalPages,
          currentPage,
          fetchComics,
        }),
        [comics, error, isLoading, totalPages, currentPage, fetchComics],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useComics = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useComics must be within ComicsProvider');
  }

  return context;
};
