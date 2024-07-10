export interface FiltersResponse {
    data: {
      projects: {
        id: number;
        title: string;
        is_active: boolean;
        disabled: boolean;
      }[];
      rooms: {
        number: number;
        is_active: boolean;
        disabled: boolean;
      }[];
      price: {
        min_range: number;
        max_range: number;
        min: number;
        max: number;
      };
      square: {
        min_range: number;
        max_range: number;
        min: number;
        max: number;
      };
    };
}