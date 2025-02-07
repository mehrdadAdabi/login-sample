export interface FilteredJobs {
  title?: string;
  page: number;
  limit: number;
  order: string;
  nextPage: boolean;
  orderBy: string;
  companyNames?: string[];
  expired?: string;
  prevPage: boolean;
  total: number;
  totalPages: number;
}
