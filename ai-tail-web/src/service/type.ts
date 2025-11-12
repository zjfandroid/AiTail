export type TApi = {
  [key: string]: {
    [key: string]: string
  }
}

export type TResData<T> = {
  code: number;
  data: T;
  totalCount?: number;
  message?: string;
}