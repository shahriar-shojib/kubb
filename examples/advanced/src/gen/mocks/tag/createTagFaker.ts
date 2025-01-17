import type { TagTag } from '../../models/ts/tag/Tag.ts'
import { faker } from '@faker-js/faker'

export function createTagTagFaker(data?: Partial<TagTag>) {
  return {
    ...{ id: faker.number.int(), name: faker.string.alpha() },
    ...(data || {}),
  }
}
