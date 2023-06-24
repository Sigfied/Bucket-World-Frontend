import {defineConfig} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'docs'
    },
    resolve: {
        alias: {
            '~/': `${pathSrc}/`
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~/assets/themecss/variable.scss" as *;`
            }
        }
    },
})
