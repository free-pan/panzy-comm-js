const path = require('path')

module.exports = {
  title: 'Element 扩展:动态表单',
  ignore: ['**/index.js'],
  version: '0.1.0',
  styleguideDir: 'styleguide-dist',
  // 在编辑器的右上角添加一个小按钮，用于将编辑器的内容复制到剪贴板
  copyCodeButton: true,
  // 是否每个章节是一个独立的页面. 默认:false
  pagePerSection: true,
  // props/events/slot的说明默认是展开还是收缩: expand / collapse / hide
  usageMode: 'expand',
  // 左侧导航默认是展开还是收缩: expand / collapse / hide
  tocMode: 'expand',
  // 显示 prop、事件、槽或方法是否来自当前文件或在 mixin 或扩展组件中配置。如果它是外部的，它会显示组件的名称，并在悬停时显示文件的相对路径。
  displayOrigins: true,
  // 用于改变，最顶部的文件路径(让使用者可以直接copy)
  getComponentPathLine(componentPath) {
    let name = path.basename(componentPath, '.vue')
    if (name.indexOf('.') === -1) {
      return `import ${name} from 'vue2-element-dyn-form';`
    } else {
      name = path.basename(componentPath, '.js')
      return `import {${name}} from 'vue2-element-dyn-form';`
    }
  },
  compilerConfig: {
    objectAssign: 'Object.assign',
    transforms: {
      // make async/await work by default (no transforms)
      asyncAwait: false,
      moduleExport: false
    }
  },
  styles: {
    Code: {
      code: {
        color: '#ff5d52',
        backgroundColor: '#fff3f0',
        padding: '0 5px',
        borderRadius: '4px'
      }
    }
  },
  sections: [
    {
      name: '指南',
      content: 'docs/introduction.md'
    },
    {
      name: '动态表单组件',
      components: 'packages/*/*.{vue,js}'
    },
    {
      name: '源代码',
      external: true,
      href: 'https://gitee.com/pan-zy/vue2-element-dyn-form.git'
    }
  ]
}
