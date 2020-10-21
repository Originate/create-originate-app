import {Express} from 'express';
import cors from 'cors';
import path from 'path';
import express, {Request, Response} from 'express';
import compression from 'compression';

import {Env} from '@/backend/src/env';

const sharedWhitelistedDomains = [
  "'self'",
  'https://www.google-analytics.com',
  'https://accounts.google.com',
  'https://apis.google.com',
  'https://ssl.gstatic.com',
  'https://www.googletagmanager.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdn4.mxpnl.com',
  'https://api-js.mixpanel.com',
];

const whitelistedDefaultSourceDomains = [
  "'self'",
  'https://accounts.google.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdn4.mxpnl.com',
  'https://api-js.mixpanel.com',
].join(' ');

const whitelistedImageDomains = [
  ...sharedWhitelistedDomains,
  'blob:',
  'data:',
  'https://ssl.google-analytics.com',
].join(' ');

const whitelistedConnectDomains = [...sharedWhitelistedDomains, 'https://sentry.io', 'https://*.sentry.io'].join(' ');

const whitelistedScriptDomains = [...sharedWhitelistedDomains, "'unsafe-inline'", "'unsafe-eval'"].join(' ');

// https://github.com/styled-components/styled-components/issues/887
const whitelistedStyleDomains = [...sharedWhitelistedDomains, "'self'", "'unsafe-inline'", 'blob:'].join(' ');

const generateContentSecurityPolicy = (isDevelopment: boolean) =>
  [
    `default-src ${whitelistedDefaultSourceDomains}`,
    `img-src ${whitelistedImageDomains}`,
    `connect-src ${whitelistedConnectDomains}`,
    `script-src ${whitelistedScriptDomains}`,
    `style-src ${whitelistedStyleDomains}`,
    isDevelopment ? null : 'upgrade-insecure-requests',
  ]
    .filter(Boolean)
    .join('; ');

const applySecurityHeadersAndConfig = (env: Env, express: Express): void => {
  express.use((_, res, next) => {
    res.header('x-frame-options', 'sameorigin');
    res.header('x-xss-protection', '1');
    res.header('x-content-type-options', 'nosniff');
    res.header('content-security-policy', generateContentSecurityPolicy(env.ENVIRONMENT === 'development'));
    res.header('referrer-policy', 'same-origin');
    res.header('strict-transport-security', 'max-age=31536000; includeSubDomains');

    next();
  });

  express.use(cors());

  express.disable('x-powered-by');
};

const sendStaticFile = (file: string, mime: string) => (_: Request, res: Response) => {
  res.set('Cache-Control', 'public, max-age=60');
  res.set('Content-Type', mime);
  res.sendFile(path.join(__dirname, '../../public/', file));
};

export const makeExpress = (env: Env, installRoutes: (app: Express) => void): Express => {
  const app = express();
  // Compress responses
  app.use(compression());

  // Setup SSL redirect, CORS, and headers from: https://securityheaders.com/
  applySecurityHeadersAndConfig(env, app);

  // Parse URL-encoded bodies (as sent by HTML forms)
  app.use(express.urlencoded({extended: true}));

  // Parse JSON bodies (as sent by API clients)
  app.use(express.json());

  // API routes
  installRoutes(app);

  // Serve static assets
  app.use('/public', express.static(path.join(__dirname, '../../public')));
  app.use('/apple-touch-icon.png', sendStaticFile('apple-touch-icon.png', 'image/png'));
  app.use('/favicon.png', sendStaticFile('favicon.png', 'image/png'));
  app.use('/robots.txt', sendStaticFile('robots.txt', 'text/plain'));
  app.use('/api/*', (_, res) => res.sendStatus(404));
  app.use('*', sendStaticFile('index.html', 'text/html; charset=UTF-8'));
  return app;
};
