export const routes = [
  {
    path: '/dashboard',
    label: 'dashboard',
    authModule: 'dashboard',
    routes: [],
  },
  {
    path: '/orders',
    label: 'orders',
    authModule: 'orders',
    routes: [],
  },
  {
    path: 'new',
    label: 'new orders',
    authModule: 'orders',
    routes: [],
  },
  {
    path: '/study',
    label: 'study',
    authModule: 'study',
    routes: [],
  },
  {
    path: '/permissions',
    label: 'permissions',
    authModule: 'permissions',
    routes: [],
  },
  {
    path: '/pharma',
    label: 'pharma',
    authModule: '/pharma/matchgen',
    routes: [
      {
        path: '/pharma/matchgen',
        label: 'matchgen',
        authModule: 'pharma/matchgen',
      },
    ],
  },

  {
    path: '/administrator',
    label: 'administrator',
    authModule: 'administrator',
    routes: [
      {
        path: '/admin/organization',
        label: 'organization',
        authModule: 'admin/organization',
      },
      {
        path: '/admin/tenant',
        label: 'tenant',
        authModule: 'admin/tenant',
      },
      {
        path: '/admin/role',
        label: 'role',
        authModule: 'admin/role',
      },
      {
        path: '/admin/user',
        label: 'user',
        authModule: 'admin/users',
      },
      {
        path: '/admin/roleassignment',
        label: 'Role Assignment',
        authModule: 'admin/roleassignment',
      },
    ],
  },
];
