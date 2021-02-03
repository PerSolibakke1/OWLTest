export type Node = {
  name: string;
  id: string;
};

export type Edge = {
  name: string;
  id: string;
};

export type Ontology = {
  subject: Node;
  predicate: Edge;
  object: Node;
};
