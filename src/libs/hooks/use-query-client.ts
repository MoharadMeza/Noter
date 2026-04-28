import { QueryClient, useQueryClient as useClientQuery } from '@tanstack/react-query'

function useQueryClient(queryClient?: QueryClient) {
  return useClientQuery(queryClient)
}

export default useQueryClient
