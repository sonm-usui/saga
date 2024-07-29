import React from 'react';

export const useWidthBreakpoint = (breakpoint = 768) => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);

  React.useEffect(() => {
    function handleWindowSizeChange() {
      if (window.innerWidth !== width) {
        setWidth(window.innerWidth);
      }
    }

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [width]);

  return width <= breakpoint;
};
