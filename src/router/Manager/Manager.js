export default {
    path: '/manager',
    component: () => import('../../views/Manager/Manager.vue'),
    meta:{ 
        requireAuth: true,
        roles:['manager']
    },
    children:[
        {
            name:'userlist',
            path:'userlist',
            component:()=>import('../../views/Manager/userList.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'rolelist',
            path:'rolelist',
            component:()=>import('../..//views/Manager/roleList.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'permission',
            path:'permission',
            component:()=>import('../..//views/Manager/permission.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'newsmanage',
            path:'newsmanage',
            component:()=>import('../..//views/Manager/newsManage.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'addnews',
            path:'addnews',
            component:()=>import('../../views/Manager/addNews.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'notice',
            path:'notice',
            component:()=>import('../../views/Manager/notice.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'sincere',
            path:'sincere',
            component:()=>import('../../views/Manager/Sincere.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'company',
            path:'company',
            component:()=>import('../../views/Manager/Company.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'more',
            path:'more',
            component:()=>import('../../views/Manager/more/More.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'announces',
            path:'announces',
            component:()=>import('../../views/Manager/announces.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'updateNotice',
            path:'updatenotice',
            component:()=>import('../../views/Manager/more/updateNotice.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
        {
            name:'updateNews',
            path:'updatenews',
            component:()=>import('../../views/Manager/more/updateNews.vue'),
            meta:{ 
                requireAuth: true,
                roles:['manager']
            }
        },
    ]
  } 