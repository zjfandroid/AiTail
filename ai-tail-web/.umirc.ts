import { defineConfig } from "umi";

export default defineConfig({
  // jsMinifier: 'terser',
  // jsMinifierOptions: {
  //   target: ['chrome80', 'es2020'], // 提升目标环境支持级别
  // },
  legacy: {},
  targets: { chrome: 80 }, // 根据实际需求调整
  routes: [
    { path: "/",
      redirect: "/jdn"
     },
    { path: "/jdnDetail", component: "strategy", title: 'Crest Protocol', },
    { path: "/jdn", component: "strategyList", title: 'Crest Protocol', },
    { path: "/dashboard", component: "dashbored", title: 'Crest Protocol - JDN', },
    { path: "/position", component: "position", title: 'Crest Protocol - JDN', },
    { path: "/gp", component: "gp", title: 'Crest Protocol - GP', },
  ],
  proxy: {
    '/drift-agent': {
      target: 'http://52.197.196.213:8888/drift-agent',
      changeOrigin: true,
      pathRewrite: { "^/drift-agent": "" }
    },
  },
  // 高级 chunk 配置 (Webpack 底层配置)
  // chainWebpack(config) {
  //   config.optimization.splitChunks({
  //     chunks: 'all',
  //     automaticNameDelimiter: '.',
  //     minSize: 30000, // 最小 chunk 大小 30KB
  //     maxSize: 500000, // 最大 chunk 大小 500KB
  //     cacheGroups: {
  //       vendors: {
  //         name: 'vendors',
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: 10,
  //       },
  //       commons: {
  //         name: 'commons',
  //         minChunks: 2, // 被引用 2 次以上才拆分
  //         priority: 5,
  //       }
  //     }
  //   });
  // },

  npmClient: 'pnpm',
});
