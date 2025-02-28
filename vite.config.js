import path, { resolve } from "node:path";
import { defineConfig } from 'vite';
import * as glob from 'glob';
import htmlPurge from 'vite-plugin-purgecss';

const obtenerEntradasHTML = ()=>{
    return Object.fromEntries(
        [
            ...glob
                .sync('./**/*.html', {ignore: ["./dist/**", "./node_modules/**"]}

            ).map (
                fileData => [
                    fileData.slice(0, fileData.length - path.extname(fileData).length),
                    resolve(__dirname, fileData)
                ]
            )
        ]
    );
}


export default defineConfig({
    appType: 'mpa',
    base: process.env.DEPLOY_BASE_URL,
    build: {
        rollupOptions: {
            input: obtenerEntradasHTML()
        }
    },
    plugins: [
        htmlPurge({})
    ]

});