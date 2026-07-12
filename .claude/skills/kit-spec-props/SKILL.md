# kit-spec-props

spec↔代码的 props 面对拍（F4）。`kit-api` 只做跨 kit 横向 diff——五套一起偏离 spec 时恒绿（B1 footer、B2 swipeDirection 就是这么漏的）。本门把 `components.md §6.1` 各条目的 props 清单解析出来，与各 kit 的 `<Comp>Props` interface 显式字段双向对拍：spec 有代码没有 = SPEC>CODE；代码显式字段没入 spec = CODE>SPEC。

解析约定：值域/默认括号剥除；「props 同 X」引用与「同 X，加 props」并集；「多一个/另带」并入；含「主题专属」的条目为开放面（CODE>SPEC 豁免）；结构性字段（children/className/rootClassName/value 系/open 系/name/id/disabled）在 ALLOW。家族行归属覆写（Menubar 的 props 住 `MenubarMenuProps`）随代码结构维护在 check.cjs 顶部。

```
node .claude/skills/kit-spec-props/check.cjs
```
