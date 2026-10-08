# PkgPulse
Web interface to build, package-shop, and customize a fresh Linux system setup with distribution and tiling window manager presets.

## Data model
| Field | Type | Notes |
| ----------- | ------------ | ------------------------------------ |
| name | text | required, max 100 chars |
| selected | boolean | toggled from the list, default false |
| type | fixed values | package, configuration, script |
| category | relation | System packages, Interface & Tiling, Utilities |
| user | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. Hyprland, selected, configuration
2. Zsh, selected, script
3. Alacritty, selected, package

## How to run
Open `index.html` in a browser. No build step, no server.

## AI usage
| Tool | Used for |
| -------------- | ----------------------------------------- |
| Gemini | Structuring the project template |

Details per stage: see the ai-log/ folder.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript
