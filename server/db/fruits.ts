import connection from './connection.ts'
import { Fruit, FruitSnakeCase, FruitData } from '../../models/fruit.ts'

const columns = [
  'id',
  'name',
  'average_grams_each as averageGramsEach',
  'added_by_user as addedByUser',
]

export async function getFruits(db = connection): Promise<Fruit[]> {
  return db('fruits')
    .select(...columns)
    .orderBy('id')
}

export async function addFruit(
  fruit: FruitData,
  userId: string,
  db = connection
): Promise<Fruit> {
  const fruitSnakeCase: FruitSnakeCase = {
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
    added_by_user: userId,
  }

  return db('fruits')
    .insert(fruitSnakeCase)
    .returning(columns)
    .then((insertedEntries) => insertedEntries[0])
}

export async function updateFruit(
  id: number,
  updatedFruit: FruitData,
  db = connection
): Promise<Fruit> {
  const fruitSnakeCase: FruitSnakeCase = {
    name: updatedFruit.name,
    average_grams_each: updatedFruit.averageGramsEach,
  }

  return db('fruits')
    .where({ id })
    .update(fruitSnakeCase)
    .returning(columns)
    .then((updatedEntries) => updatedEntries[0])
}

export async function deleteFruit(id: number, db = connection) {
  return db('fruits').where({ id }).delete()
}

export async function userCanEdit(
  fruitId: number,
  auth0Id: string,
  db = connection
) {
  return db('fruits')
    .where({ id: fruitId })
    .first()
    .then((fruit: FruitSnakeCase) => {
      if (fruit.added_by_user !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
