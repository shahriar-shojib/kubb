import { rest } from 'msw'
import { createUpdatePetMutationResponse } from '../../mocks/petController/createUpdatePet'

export const mockUpdatePetHandler = rest.get('*/pet', function handler(req, res, ctx) {
  return res(ctx.json(createUpdatePetMutationResponse()))
})
