export interface Node {
  id: string
  name: string
  symbolSize: number
  x: number
  y: number
  value: number
  category: number
}

export interface Link {
  source: string
  target: string
}

export interface Category {
  name: string
}

export interface Graph {
  nodes: Node[]
  links: Link[]
  categories: Category[]
}
