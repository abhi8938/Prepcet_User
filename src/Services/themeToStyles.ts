let styles = {
  body: {
    background: '#fafafa',
    color: '#121212',
    'font-family': 'Default',
    'font-size': '100%',
    'line-height': 'normal',
    '-webkit-touch-callout': 'all' /* iOS Safari */,
    '-webkit-user-select': 'all' /* Safari */,
    '-khtml-user-select': 'all' /* Konqueror HTML */,
    '-moz-user-select': 'all' /* Firefox */,
    '-ms-user-select': 'all' /* Internet Explorer/Edge */,
    'user-select': 'all',
  },
  p: {
    color: '#ffffff',
    'font-family': 'Default',
    'font-size': '100%',
    'line-height': 'normal',
  },
  li: {
    color: '#ffffff',
    'font-family': 'Default',
    'font-size': '100%',
    'line-height': 'normal',
  },
  h1: {
    color: '#ffffff',
  },
};

export default function (theme: any) {
  styles.body = {
    background: theme.background,
    color: theme.color,
    'font-family': theme.font,
    'font-size': `${theme.size}px`,
    'line-height': 'normal',
    '-webkit-touch-callout': theme.selectActive /* iOS Safari */,
    '-webkit-user-select': theme.selectActive /* Safari */,
    '-khtml-user-select': theme.selectActive /* Konqueror HTML */,
    '-moz-user-select': theme.selectActive /* Firefox */,
    '-ms-user-select': theme.selectActive /* Internet Explorer/Edge */,
    'user-select': theme.selectActive,
  };
  styles.p = {
    color: theme.fg,
    'font-family': theme.font,
    'font-size': `${theme.size}px`,
    'line-height': 'normal',
  };
  styles.li = {
    color: theme.fg,
    'font-family': theme.font,
    'font-size': `${theme.size}px`,
    'line-height': 'normal',
  };
  styles.h1.color = theme.fg;
  return styles;
}
