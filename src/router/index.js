import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
import componentsRouter from "./modules/components";
import chartsRouter from "./modules/charts";
import tableRouter from "./modules/table";
import nestedRouter from "./modules/nested";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
    ],
  },

  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "Profile", icon: "user", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: "/categories",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/categories/index"),
  //       name: "Danh mục chung",
  //       meta: { title: "Danh mục chung", icon: "documentation", noCache: true },
  //     },
  //   ],
  // },
  {
    path: "/dm",
    component: Layout,
    name: "Danh mục",
    meta: {
      title: "Quản lý danh mục",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "/dm-tai-khoan",
        component: () => import("@/views/danhmucchung/dm-taikhoan/index"),
        name: "tbldmtaikhoan",
        meta: {
          title: "Danh mục tài khoản",
          icon: "documentation",
          noCache: true,
        },
      },
      // {
      //   path: "/dm-tai-khoan-chi-tiet",
      //   component: () =>
      //     import("@/views/danhmucchung/dm-taikhoan-chitiet/index"),
      //   name: "tbldmtaikhoanchitiet",
      //   meta: {
      //     title: "Danh mục tài khoản chi tiết",
      //     icon: "documentation",
      //     noCache: true,
      //   },
      // },
      
      {
        path: "/dm-chiphi-tratruoc",
        component: () =>
          import("@/views/danhmucchung/dm-chiphi-tratruoc/index"),
        name: "tbldmchiphi_tratruoc",
        meta: {
          title: "Danh mục chi phí trả trước",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "/dm-khach-hang",
        component: () => import("@/views/danhmucchung/dm-khachhang/index"),
        name: "tbldmkhachhang",
        meta: {
          title: "Danh mục khách hàng",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "/dm-nha-cung-cap",
        component: () => import("@/views/danhmucchung/dm-nha-cungcap/index"),
        name: "tbldmnhacungcap",
        meta: {
          title: "Danh mục nhà cung cấp",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "/dm-tai-san",
        component: () => import("@/views/danhmucchung/dm-taisan/index"),
        name: "tbldmtaisan",
        meta: {
          title: "Danh mục tài sản",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "/dm-vatu-hanghoa",
        component: () => import("@/views/danhmucchung/dm-vattu-hanghoa/index"),
        name: "tbldmvattu_hanghoa",
        meta: {
          title: "Danh mục vật tư hàng hóa",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "/dm-kho-hang",
        component: () =>
          import("@/views/danhmucchung/dm-khohang/index"),
        name: "tbldmkhohang",
        meta: {
          title: "Danh mục kho hàng",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "/dm-others",
        component: () => import("@/views/categories/index"),
        name: "dm_others",
        meta: {
          title: "Danh mục khác",
          icon: "documentation",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/nhap",
    component: Layout,
    name: "Nhập chứng từ",
    meta: {
      title: "Nhập chứng từ",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "phieuthutienmat",
        component: () => import("@/views/nhapchungtu/index"),
        name: "nhapphieuthutienmat",
        meta: {
          title: "Phiếu thu tiền mặt",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "phieuchitienmat",
        component: () => import("@/views/nhapchungtu/index"),
        name: "nhapphieuchitienmat",
        meta: {
          title: "Phiếu chi tiền mặt",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "phieunhapvattucongcu",
        component: () => import("@/views/nhapchungtu/index"),
        name: "nhapphieunhapvattucongcu",
        meta: {
          title: "Phiếu nhập Vật tư - Công cụ",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "banhangthutiensau",
        component: () => import("@/views/nhapchungtu/index"),
        name: "nhapbanhangthutiensau",
        meta: {
          title: "Bán hàng thu tiền sau",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "chungtunganhang",
        component: () => import("@/views/nhapchungtu/index"),
        name: "nhapchungtunganhang",
        meta: {
          title: "Chứng từ ngân hàng",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "chungtughiso",
        component: () => import("@/views/nhapchungtu/index"),
        name: "nhapchungtughiso",
        meta: {
          title: "Chứng từ ghi sổ",
          icon: "documentation",
          noCache: true,
        },
      },
      {
        path: "chungtuluuchuyennoibo",
        component: () => import("@/views/nhapchungtu/index"),
        name: "nhapchungtuluuchuyennoibo",
        meta: {
          title: "Chứng từ lưu chuyển nội bộ",
          icon: "documentation",
          noCache: true,
        },
      },
    ],
  },
  // {
  //   path: "/nhap/phieuthutienmat",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/nhapchungtu/index"),
  //       name: "nhapphieuthutienmat",
  //       meta: {
  //         title: "Nhập phiếu thu tiền mặt",
  //         icon: "documentation",
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/nhap/phieuchitienmat",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/nhapchungtu/index"),
  //       name: "nhapphieuchitienmat",
  //       meta: {
  //         title: "Nhập phiếu chi tiền mặt",
  //         icon: "documentation",
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/nhap/phieunhapvattucongcu",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/nhapchungtu/index"),
  //       name: "nhapphieunhapvattucongcu",
  //       meta: {
  //         title: "Nhập phiếu nhập Vật tư - Công cụ",
  //         icon: "documentation",
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/nhap/banhangthutiensau",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/nhapchungtu/index"),
  //       name: "nhapbanhangthutiensau",
  //       meta: {
  //         title: "Nhập bán hàng thu tiền sau",
  //         icon: "documentation",
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/nhap/chungtunganhang",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/nhapchungtu/index"),
  //       name: "nhapchungtunganhang",
  //       meta: {
  //         title: "Nhập chứng từ ngân hàng",
  //         icon: "documentation",
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/nhap/chungtughiso",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/nhapchungtu/index"),
  //       name: "nhapchungtughiso",
  //       meta: {
  //         title: "Nhập chứng từ ghi sổ",
  //         icon: "documentation",
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/nhap/chungtuluuchuyennoibo",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/nhapchungtu/index"),
  //       name: "nhapchungtuluuchuyennoibo",
  //       meta: {
  //         title: "Nhập chứng từ lưu chuyển nội bộ",
  //         icon: "documentation",
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
