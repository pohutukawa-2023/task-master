import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from './api.ts'

export function useFruits() {
  const query = useQuery({
    queryKey: ['fruits'],
    queryFn: API.getFruits,
  })

  return {
    ...query,
    update: useUpdateFruit(),
    delete: useDeleteFruit(),
    add: useAddFruit(),
  }
}

export function useFruitMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['fruits'])
    },
  })

  return mutation
}

export function useUpdateFruit() {
  return useFruitMutation(API.updateFruit)
}

export function useDeleteFruit() {
  return useFruitMutation(API.deleteFruit)
}

export function useAddFruit() {
  return useFruitMutation(API.addFruit)
}
