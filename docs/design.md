# Resumehub's design

Documentation related to the website's design pattern and structure.

In most case, you can find most design specs in the `src/theme` folder.

While it may vary depending in different situations, we generally use these specs for specific parts of our website. Please follow for consistency.

## Fonts

In terms of font style, we use Noto Serif and Noto Sans HK. Serif is used for our interviews while Noto Sans HK is used everywhere else.

In terms of font size, we generally import from `components/common/system/typography` since they usually have similar properties that can be predefined (think <A> tag with `href`).

- H1/2em
  - page title
- H2/1.5em
  - section title
- H3/1.17em
  - card title
- H4/1em
  - rarely used at the moment...
- P/1em
  - text
- A/em
  - hyperlink

## Palette

In terms of palette, we use material design's palette as our base.

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

For our layouts, we separate each section with a spacing.xl within each page component, whether it is horizontally or vertically. For other general layout, such as page padding, you can use the const `size` within the `theme` file.

For our fonts, we attribute each font to a specific spacing.

In situations where different fonts are combined, we generally subtract spacing.s to the largest spacing. For e.g, if we have H1 and P together, the spacing in between should be spacing.l (xl - s).

- spacing.xl (32px)
  - H1
- spacing.l (24px)
  - H2
- spacing.m (16px)
  - H3, P, A
