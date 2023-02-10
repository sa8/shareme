// First, we must import the schema creator
//import createSchema from 'part:@sanity/base/schema-creator'

import pin from './pin'
import user from './user'
import comment from './comment'
import postedBy from './postedBy'
import save from './save'

export const schemaTypes = [pin, user, postedBy, comment, save]
