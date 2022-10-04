import LoginView from '../view'
import { LoginViewModel } from '../models'
import React from 'react'

import renderer from 'react-test-renderer'

jest.mock('../view.model', () => {
  const fnLoginViewModel = jest.fn()
  fnLoginViewModel.mockImplementation(
    () => ({
      email: '',
      setEmail: jest.fn(),
      isLoading: false,
      onSubmit: jest.fn(),
      password: '',
      setPassword: jest.fn(),
    } as LoginViewModel)
  )

  return fnLoginViewModel
})

import useLoginViewModel from '../view.model'

it('should render correctly', () => {
  const { toJSON } = renderer.create(<LoginView />)
  expect(toJSON()).toMatchSnapshot()
})

it('should render correctly with email', () => {
  useLoginViewModel.mockImplementation(
    () => ({
      email: 'rafael@gmail.com',
      setEmail: jest.fn(),
      isLoading: false,
      onSubmit: jest.fn(),
      password: '',
      setPassword: jest.fn(),
    } as LoginViewModel)
  )

  const { toJSON } = renderer.create(<LoginView />)
  expect(toJSON()).toMatchSnapshot()
})

it('should render correctly with password', () => {
  useLoginViewModel.mockImplementation(
    () => ({
      email: '',
      setEmail: jest.fn(),
      isLoading: false,
      onSubmit: jest.fn(),
      password: '12345678',
      setPassword: jest.fn(),
    } as LoginViewModel)
  )
    
  const { toJSON } = renderer.create(<LoginView />)
  expect(toJSON()).toMatchSnapshot()
})

it('should render correctly with email and password', () => {
  useLoginViewModel.mockImplementation(
    () => ({
      email: 'rafael@gmail.com',
      setEmail: jest.fn(),
      isLoading: false,
      onSubmit: jest.fn(),
      password: '12345678',
      setPassword: jest.fn(),
    } as LoginViewModel)
  )
      
  const { toJSON } = renderer.create(<LoginView />)
  expect(toJSON()).toMatchSnapshot()
})

it('should render correctly while is loading', () => {
  useLoginViewModel.mockImplementation(
    () => ({
      email: 'rafael@gmail.com',
      setEmail: jest.fn(),
      isLoading: true,
      onSubmit: jest.fn(),
      password: '12345678',
      setPassword: jest.fn(),
    } as LoginViewModel)
  )
        
  const { toJSON } = renderer.create(<LoginView />)
  expect(toJSON()).toMatchSnapshot()
})

