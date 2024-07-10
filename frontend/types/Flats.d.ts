export interface Flat {
    id: number,
    project_title: string,
    rooms: number,
    studio: boolean,
    price: string,
    old_price: string,
    square: string,
    release_dates: string,
    floor: string,
    image: string
}

export interface ApiResponse {
    data: Flat[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: { url: string | null; label: string; active: boolean }[];
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
}