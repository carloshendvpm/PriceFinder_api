const { createUser } = require('../repositories/user.repository')
const { userValidation } = require('../validations/user.validation')

test('Should create a user correctly and return the user data', async () => {
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: null,
    cpf: '12345678901'
  }
  
  const createdUser = await createUser(userData)
  
  expect(createdUser).toHaveProperty('id')
  expect(createdUser.name).toBe(userData.name)
  expect(createdUser.email).toBe(userData.email)
  expect(createdUser).not.toHaveProperty('password')
  expect(createdUser.phone).toBe(userData.phone)
  expect(createdUser).toHaveProperty('createdAt')
  expect(createdUser).toHaveProperty('updatedAt')
})