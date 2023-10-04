export type IResponse<T> = {
  data: T;
  _metadata?: T | undefined;
};
