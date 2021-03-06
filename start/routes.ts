/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
import * as dotenv from 'dotenv'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import Tag from 'App/Models/Tag'
import Paste from 'App/Models/Paste'

Route.group(() => {

  // routes for tags and posts
  Route.post('/tags', async ( {auth, request, response }) => {
    // new tag
    await auth.use('api').authenticate()
    const tag = new Tag()
    tag.name = request.input('tag')
    await tag.save()
    return response.created()
  })

  Route.get('/tags', async({ auth, request, response }) => {
    // no auth necessary?
    // do it anyway to prevent unauthenticated lists using bandwidth from server
    await auth.use('api').authenticate()
    const tags = await Tag.all()
    return { tags: tags }
  })

  Route.post('/posts', async ({auth, request, response }) => {
    await auth.use('api').authenticate()

  })

  Route.post('/register', async ({ request, response }) => {
    const user = new User()
    user.email = request.input('email')
    user.password = request.input('password')
    user.name = request.input('name')
    await user.save()
    return response.created()
  })

  Route.get('/profile', async ({ auth, request, response }) => {
    await auth.use('api').authenticate()
    return {
      user: auth.use('api').user!
    }
  })

  Route.post('/login', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '24hours', name: 'MobileToken' })
      return token
    }
    catch {
      return response.unauthorized()
    }
  })

  Route.get('/logout', async ({ auth, response }) => {
    await auth.use('api').authenticate() // really?
    await auth.use('api').revoke()
    return {
      revoked: true
    }
  })
})
.prefix('/api/v1')
