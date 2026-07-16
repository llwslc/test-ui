---
name: kit-demo-states
description: Static gate — every state a kit wrapper EXPOSES must be EXHIBITED by the demo. For each kit it scans component dirs for state props (`disabled?:` at top level or in an items def, `error?:`), then requires a matching usage in that kit's App.tsx (tag attr, inline items entry, or a referenced items const), plus one disabled MenuItem in each menu host panel (menu/menubar/context). Kills the class where a styled/API-real state (disabled+checked, folding disabled, static error) has no demo instance — invisible to the eye, to kit-states, and to the kit-interact disabled checks (they only audit rendered elements), so it ships broken and is found by the user (the 折叠禁用 saga). Run after changing a wrapper API or demo composition; app.md「面板内容与状态」 is the human-readable pin this gate mechanizes.
---

# kit-demo-states

```
node .claude/skills/kit-demo-states/check.cjs
```

- Scope: state props only (`disabled`, `error`) — variants/tones are covered by app.md pins + fingerprint; interaction-held states (hover/focus/active/open) belong to kit-states/kit-interact.
- Excluded: Tooltip（其 `disabled` 是行为压制、无静息渲染，demo 只摆 4 向——app.md 裁决）; Menu/Menubar/ContextMenu 走 hosts 规则。
- Detection is textual: a usage anywhere in App.tsx counts, including a conditional one (the AccessKey 受控 error field). REST-visibility is pinned by app.md and frozen by render-fingerprint, not by this gate.
- Menu hosts are checked per panel (meta MNU/MBR/CTX) because the shared MenuItem's `disabled` must be exhibited in each host's own popup.
- fails-on-broken proven: stripping `disabled` from one demo OtpField turns the gate red naming kit+component.
