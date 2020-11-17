# Careeers's design

Documentation related to the website's design pattern and structure.

In most case, you can find most design specs in the [src/theme](https://github.com/karmingc/careeers/tree/main/packages/website/src/theme) folder.

While it may vary depending in different situations, we generally use these specs for specific parts of our website. Please follow for consistency.

## Fonts

In terms of font style, we use Noto Serif and Noto Sans HK. Serif is used for our interviews while Noto Sans HK is used everywhere else.

In terms of font size, we generally import from [components/common/system/typography](https://github.com/karmingc/careeers/blob/main/packages/website/src/components/common/system/typography.tsx) since they usually have similar properties that can be predefined (think <A> tag with `href`).

- `H1`/2em
  - page title
- `H2`/1.5em
  - section title
- `H3`/1.17em
  - card title
- `H4`/1em
  - rarely used at the moment...
- `P`/1em
  - text
- `A`/em
  - hyperlink

## Palette

In terms of palette, we use [material design](https://material.io/resources/color/#!/)'s color chart as our base.

- background
  - white: #ffffff
- fonts
  - primary grey: #212121
    - main fonts
  - secondary grey: #424242
    - sub fonts
  - primary blue: #2196f3
    - hyperlink

## Spacing

In terms of spacing, we use a 8pt grid spacing style as our base ranging from zero (0p) to xxxxxl (64px).

For our layouts, we separate each section with a `rawSpacing.xl` within each page component, whether it is horizontally or vertically. For other general layout, such as page padding, you can use the const `size` within the [theme](https://github.com/karmingc/careeers/blob/main/packages/website/src/theme/index.tsx) file.

For our fonts, we attribute each font to a specific spacing.

- `rawSpacing.xl` (32px)
  - H1
- `rawSpacing.l` (24px)
  - H2
- `rawSpacing.m` (16px)
  - H3, P, A

In situations where different fonts are combined, we generally subtract spacing.s to the largest spacing.

For e.g, if we have H1 and P together, the spacing in between should be spacing.l (xl - s).

```
<div css={css`${verticalStackCss.xl}`}>
    <H1></H1>
    <P contentCss={css`margin-top: -${rawSpacing.s}px`}></P>
<div>
```

## Animation

For our animation, we use [react-spring](https://www.react-spring.io/). In short, while it is possible add duration or easing prop, React Spring leverages native physics and feels natural by default. Additionally, please take a look at the performance [tab](https://www.react-spring.io/docs/props/performance). It will be useful in the long run in understading how each animation does not require re-render per frame.

Unless specified otherwise, please follow these animations for consistency.

For main images

```bash
<Spring
  from={{ opacity: 0, transform: 'translate(-15%, 0%)' }}
  to={{ opacity: 1, transform: 'translate(0%, 0%)' }}
  config={config.slow}
>
  {children}
</Spring>
```

For fonts and secondary images

```bash
<Spring
  from={{ opacity: 0, transform: 'translateY(15%)' }}
  to={{ opacity: 1, transform: 'translateY(0%)' }}
  config={config.slow}
>
  {children}
</Spring>
```
