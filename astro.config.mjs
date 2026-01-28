// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import starlightLinksValidator from "starlight-links-validator"
import markdocGrammar from "./grammars/markdoc.tmLanguage.json"
import rehypeMermaid from "rehype-mermaid"

export const locales = {
  root: { label: "English", lang: "en" },
  "zh-cn": { label: "简体中文", lang: "zh-CN" },
}

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== "production" && process.env.DEPLOY_PRIME_URL

const PROD_SITE = process.env.SITE || process.env.URL || "http://localhost:4321/"
const site = NETLIFY_PREVIEW_SITE || PROD_SITE
const ogUrl = new URL("og.jpg?v=1", site).href
const ogImageAlt = "Maia Docs"

export default defineConfig({
  site,
  trailingSlash: "ignore",
  markdown: {
    rehypePlugins: [rehypeMermaid],
  },
  integrations: [
    starlight({
      title: "Maia Docs",
      logo: {
        light: "/src/assets/logo-light.svg",
        dark: "/src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/obiscr/maia-docs/edit/main/",
      },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/obiscr/maia" },
      ],
      head: [
        {
          tag: "meta",
          attrs: { property: "og:image", content: ogUrl },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:alt", content: ogImageAlt },
        },
      ],
      customCss: ["./src/assets/landing.css", "./src/assets/mermaid.css"],
      locales,
      sidebar: [
        {
          label: "Overview",
          translations: { "zh-CN": "概览" },
          items: [
            { label: "Why Maia?", slug: "overview/why-maia", translations: { "zh-CN": "为什么是 Maia？" } },
            { label: "Architecture", slug: "overview/architecture", translations: { "zh-CN": "架构与组件" } },
          ],
        },
        {
          label: "Quick start",
          translations: { "zh-CN": "快速开始" },
          items: [
            {
              label: "Self-host with Docker",
              slug: "quick-start/self-host",
              translations: { "zh-CN": "Docker 自托管" },
            },
            {
              label: "Setup",
              slug: "quick-start/setup",
              translations: { "zh-CN": "初始化设置" },
            },
            {
              label: "First workflow",
              slug: "quick-start/first-workflow",
              translations: { "zh-CN": "运行第一个工作流" },
            },
            {
              label: "Run locally with Dev",
              slug: "quick-start/build-from-source-dev",
              translations: { "zh-CN": "本地 Dev 运行" },
            },
            {
              label: "Run locally with Docker",
              slug: "quick-start/build-from-source-docker",
              translations: { "zh-CN": "本地 Docker 运行" },
            },
            {
              label: "Reverse proxy & HTTPS",
              slug: "quick-start/reverse-proxy",
              translations: { "zh-CN": "反向代理与 HTTPS" },
            },
          ],
        },
        {
          label: "Workflows",
          translations: { "zh-CN": "工作流" },
          items: [
            { label: "Editor", slug: "workflows/editor", translations: { "zh-CN": "编辑器" } },
            { label: "Input spec", slug: "workflows/input-spec", translations: { "zh-CN": "输入规范" } },
            { label: "Outputs spec", slug: "workflows/outputs-spec", translations: { "zh-CN": "输出规范" } },
            { label: "Environment variables", slug: "workflows/environment", translations: { "zh-CN": "环境变量" } },
            { label: "Dependency", slug: "workflows/dependencies", translations: { "zh-CN": "依赖管理" } },
            { label: "Versioning & restore", slug: "workflows/versioning", translations: { "zh-CN": "版本与还原" } },
            { label: "Import & export", slug: "workflows/import-export", translations: { "zh-CN": "导入与导出" } },
          ],
        },
        {
          label: "Troubleshooting",
          translations: { "zh-CN": "故障排除" },
          items: [
            {
              label: "Can't sign in (login loop)",
              slug: "troubleshooting/cant-sign-in",
              translations: { "zh-CN": "无法登录（登录循环）" },
            },
          ],
        },
      ],
      expressiveCode: { shiki: { langs: [markdocGrammar] } },
      plugins: process.env.CHECK_LINKS
        ? [
            starlightLinksValidator({
              errorOnFallbackPages: false,
              errorOnInconsistentLocale: true,
            }),
          ]
        : [],
    }),
  ],
})
