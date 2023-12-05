import { auth } from 'express-oauth2-jwt-bearer'
import * as jose from 'jose'
import express from 'express'
import * as oidc from 'express-openid-connect'
import dotenv from 'dotenv'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const envConfig = dotenv.config()
  if (envConfig.error) throw envConfig.error
}

export const oidcConfig: oidc.ConfigParams = {
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email create:orders update:users',
    audience: process.env.VITE_AUTH0_AUDIENCE,
  },
  authRequired: false,
  auth0Logout: true,

  baseURL: 'http://localhost:3000',
  clientID: process.env.VITE_AUTH0_CLIENT_ID,
  clientSecret: process.env.VITE_AUTH0_CLIENT_SECRET,
  issuerBaseURL: `https://${process.env.VITE_AUTH0_DOMAIN}`,
  secret: 'LONG_RANDOM_STRING',
  routes: {
    login: false,
    postLogoutRedirect: '/moderator/home',
  },
}

const authConfig = {
  issuerBaseURL: `https://${process.env.VITE_AUTH0_DOMAIN}`,
  audience: process.env.VITE_AUTH0_AUDIENCE,
}

export const validateAccessToken = auth(authConfig)

export function requiresPermission(requiredPermission: string) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // Safely extract the access token
    const accessToken =
      req.oidc && req.oidc.accessToken
        ? req.oidc.accessToken.access_token
        : null

    if (!accessToken || typeof accessToken !== 'string') {
      return res.status(403).send('Forbidden: no or invalid access token')
    }

    try {
      const decoded = jose.decodeJwt(accessToken) as { permissions: string[] }
      const permissions = decoded && (decoded.permissions || [])

      if (!permissions.includes(requiredPermission)) {
        return res.status(403).send('Forbidden: insufficient scope')
      }

      next()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(403).send(`Forbidden: invalid token (${err.message})`)
      }
    }
  }
}
