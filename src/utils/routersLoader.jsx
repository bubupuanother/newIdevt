import loadable from '@/utils/loader'
export const Login = loadable(() => import('@/pages/login'))
export const Home = loadable(() => import('@/pages/home'))
export const Register = loadable(() => import('@/pages/register'))
export const Add = loadable(() => import('@/component/add'))
export const Head = loadable(() => import("@/component/head"))
export const Body = loadable(() => import("@/component/body"))
export const Native = loadable(() => import("@/component/native"))
export const Adult = loadable(() => import("@/component/adult"))
export const Details = loadable(() => import("@/component/details"))
export const Addone = loadable(() => import("@/component/add_box"))
