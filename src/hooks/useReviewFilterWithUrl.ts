import { useRouter, useSearchParams } from 'next/navigation';

import { useCallback, useMemo } from 'react';

export type ReviewSortBy = 'LATEST' | 'HIGHEST_RATING' | 'LOWEST_RATING';

export type ReviewFilters = {
  sortBy: ReviewSortBy;
};

interface UseReviewFilterWithUrl {
  courseId: string;
}
const useReviewFilterWithUrl = ({ courseId }: UseReviewFilterWithUrl) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getFiltersFromUrl = useCallback(() => {
    const sortBy = searchParams.get('sortBy');
    return {
      sortBy:
        sortBy === 'HIGHEST_RATING' || sortBy === 'LOWEST_RATING'
          ? sortBy
          : ('LATEST' as ReviewSortBy),
    };
  }, [searchParams]);

  const updateUrlWithFilters = useCallback(
    (newFilters: ReviewFilters) => {
      const queryParams = new URLSearchParams();

      if (newFilters.sortBy) {
        queryParams.set('sortBy', newFilters.sortBy);
      }

      const newUrl = `/course/${courseId}/reviews?${queryParams.toString()}`;
      router.push(newUrl);
    },
    [router],
  );

  const filters = useMemo(() => getFiltersFromUrl(), [getFiltersFromUrl]);

  return {
    filters,
    updateUrlWithFilters,
  };
};

export default useReviewFilterWithUrl;
