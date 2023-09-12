import {auth, config, connector, g } from '@grafbase/sdk'


// @ts-ignore
const User = g.model('User', {
  name: g.string().length({ min:2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  project: g.relation(() => Project).list().optional()
}).auth((rules) => {
  rules.public().read()
})

// @ts-ignore
const Project = g.model('Project', {
  title: g.string().length({ min:3 }),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() =>User)
}).auth((rules) => {
  rules.public().read(),
  rules.public().create().delete().update()
})

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET')
})