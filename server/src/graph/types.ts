export interface SubSchema {
  types?: string | null;
  query?: string | null;
  mutation?: string | null;
}

export interface SubGraph {
  schema: string;
  root: any;
}
