import client from '@kubb/plugin-client/client'
import useSWRMutation from 'swr/mutation'
import type { UpdateUserMutationRequest, UpdateUserMutationResponse, UpdateUserPathParams } from '../models/UpdateUser.ts'
import type { RequestConfig } from '@kubb/plugin-client/client'

export const updateUserMutationKey = () => [{ url: '/user/{username}' }] as const

export type UpdateUserMutationKey = ReturnType<typeof updateUserMutationKey>

/**
 * @description This can only be done by the logged in user.
 * @summary Update user
 * @link /user/:username
 */
async function updateUser(
  username: UpdateUserPathParams['username'],
  data?: UpdateUserMutationRequest,
  config: Partial<RequestConfig<UpdateUserMutationRequest>> = {},
) {
  const res = await client<UpdateUserMutationResponse, Error, UpdateUserMutationRequest>({ method: 'PUT', url: `/user/${username}`, data, ...config })
  return res.data
}

/**
 * @description This can only be done by the logged in user.
 * @summary Update user
 * @link /user/:username
 */
export function useUpdateUser(
  username: UpdateUserPathParams['username'],
  options: {
    mutation?: Parameters<typeof useSWRMutation<UpdateUserMutationResponse, Error, UpdateUserMutationKey, UpdateUserMutationRequest>>[2]
    client?: Partial<RequestConfig<UpdateUserMutationRequest>>
    shouldFetch?: boolean
  } = {},
) {
  const { mutation: mutationOptions, client: config = {}, shouldFetch = true } = options ?? {}
  const mutationKey = updateUserMutationKey()
  return useSWRMutation<UpdateUserMutationResponse, Error, UpdateUserMutationKey | null, UpdateUserMutationRequest>(
    shouldFetch ? mutationKey : null,
    async (_url, { arg: data }) => {
      return updateUser(username, data, config)
    },
    mutationOptions,
  )
}
