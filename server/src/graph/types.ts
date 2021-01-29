export interface SubSchema {
  types?: string | null;
  query?: string | null;
  mutation?: string | null;
}

export interface SubGraph {
  schema: SubSchema;
  root: any;
}
