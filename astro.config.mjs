// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import starlightLinksValidator from "starlight-links-validator"
import markdocGrammar from "./grammars/markdoc.tmLanguage.json"

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
  trailingSlash: "always",
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
        baseUrl: "https://github.com/obiscr/maia-docs/edit/main/src/content/docs/",
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
      customCss: ["./src/assets/landing.css"],
      locales,
      sidebar: [
        {
          label: "Overview",
          translations: { "zh-CN": "概览" },
          items: [
            { label: "What is Maia?", slug: "overview/what-is-maia", translations: { "zh-CN": "Maia 是什么？" } },
            { label: "Architecture", slug: "overview/architecture", translations: { "zh-CN": "架构与组件" } },
          ],
        },
        {
          label: "Quick start",
          translations: { "zh-CN": "快速开始" },
          items: [
            {
              label: "Self-host with Docker",
              slug: "quick-start/docker",
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
          ],
        },
        {
          label: "More (coming soon)",
          slug: "coming-soon",
          translations: { "zh-CN": "更多内容（敬请期待）" },
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
