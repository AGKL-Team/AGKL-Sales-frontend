export interface Element {
  path: string;
  element: React.ReactNode;
}

export interface Route {
  path: string;
  element: React.ReactNode;
  children: Element[];
}
