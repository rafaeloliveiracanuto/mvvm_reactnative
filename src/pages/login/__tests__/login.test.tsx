import MockAdapter from 'axios-mock-adapter'
import client from '../../../repositories/client'
import { UserModel } from '../../../common/models/user.model'
import { renderHook, act } from '@testing-library/react-hooks'
import useLoginViewModel from '../view.model'
import { Alert } from 'react-native'

const mock = new MockAdapter(client)

it('should be able to sign in', async () => {
  const user: UserModel = {
    email: 'rafael@gmail.com',
    id: '1',
    name: 'Rafael',
  }

  const password = 'Rafael123'

  mock.onPost('/sessions').reply(200, user)

  const { result, waitFor } = renderHook(() => useLoginViewModel())

  await act(() => result.current.setEmail(user.email))

  await waitFor(() => result.current.email === user.email)

  await act(() => result.current.setPassword(password))

  await waitFor(() => result.current.password === password)

  await act(() => result.current.onSubmit())

  await waitFor(() => result.current.isLoading === false)

  expect(result.current.isLoading).toBe(false)
  expect(result.current.email).toBe(user.email)
  expect(result.current.password).toBe(password)
  expect(mock.history.post[0].url).toEqual('/sessions')
  expect(mock.history.post[0].data).toEqual(
    JSON.stringify({ email: user.email, password })
  )

  mock.resetHistory()
})

it('should break on sign in', async () => {
  const email = 'rafael@gmail.com'
  const password = 'Rafael123'

  mock.onPost('/sessions').reply(404, 'User not found')

  const alert = jest.spyOn(Alert, 'alert')

  const { result, waitFor } = renderHook(() => useLoginViewModel())

  await act(() => result.current.setEmail(email))

  await waitFor(() => result.current.email === email)

  await act(() => result.current.setPassword(password))

  await waitFor(() => result.current.password === password)

  await act(() => result.current.onSubmit())

  await waitFor(() => result.current.isLoading === false)

  expect(result.current.isLoading).toBe(false)
  expect(result.current.email).toBe(email)
  expect(result.current.password).toBe(password)
  expect(mock.history.post[0].url).toEqual('/sessions')
  expect(mock.history.post[0].data).toEqual(
    JSON.stringify({ email: email, password })
  )
  expect(alert).toHaveBeenCalledWith('Oops!', 'Something went wrong!')

  mock.resetHistory()
})