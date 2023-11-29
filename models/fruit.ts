export interface FruitSnakeCase {
  id?: number
  name: string
  average_grams_each: number
  added_by_user?: string
}

export interface Fruit {
  id: number
  name: string
  averageGramsEach: number
  addedByUser: string
}

export interface FruitData {
  name: string
  averageGramsEach: number
}
