import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    // Skip prerender for form
  {
    path: 'feedback/:companyId/form',
    renderMode: RenderMode.Client
  },
  // Skip prerender for dashboard
  {
    path: 'feedback/:companyId',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
