import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'
import type { FindWebsiteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Website from 'src/components/Website/Website'

export const QUERY = gql`
  query FindWebsiteById($id: Int!) {
    website: website(id: $id) {
      id
      domain
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Website not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <Alert status="error">
    <AlertIcon />
    <AlertDescription>Error: {error?.message}</AlertDescription>
  </Alert>
)

export const Success = ({ website }: CellSuccessProps<FindWebsiteById>) => {
  return <Website website={website} />
}
