import React from 'react';

// icon:chevron-right | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
export const IconChevronRight = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
      />
    </svg>
  );
};

// icon:bx-world | Boxicons https://boxicons.com/ | Atisa
export const IconWorld = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 00-2-2h-4v-3a2 2 0 002-2V7h1a2 2 0 002-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 01-1.67 4.873z" />
    </svg>
  );
};
