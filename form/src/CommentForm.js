import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react'

const EMAIL_TEXT =
  'If you provide your email, then you will get notification when someone replies to your comment.'

function CommentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl py={1} isInvalid={'fullname' in errors}>
        <FormLabel>Your name</FormLabel>
        <Input
          type="text"
          {...register('fullname', { required: 'Your name is required' })}
        />
        <FormErrorMessage>{errors?.fullname?.message}</FormErrorMessage>
      </FormControl>
      <FormControl py={1}>
        <FormLabel>Your email</FormLabel>
        <Input type="email" {...register('email')} />
        <FormHelperText>{EMAIL_TEXT}</FormHelperText>
      </FormControl>
      <FormControl py={1} isInvalid={'comment' in errors}>
        <FormLabel>Your comment</FormLabel>
        <Textarea
          type="text"
          placeholder="What's on your mind?"
          {...register('comment', {
            required: "Don't forget to write your comment",
          })}
        />
        <FormErrorMessage>{errors?.comment?.message}</FormErrorMessage>
      </FormControl>
      <Box py={2}>
        <Button type="submit" colorScheme="teal">
          Submit my comment
        </Button>
      </Box>
    </form>
  )
}

export default CommentForm