export class PagedResults<T> {
  current_page: number;
  total_entries: number;
  entries: T[];
}
