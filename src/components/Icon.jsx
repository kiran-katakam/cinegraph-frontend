// One stroke family for every icon: 24px grid, 2.5 stroke, square caps.
const PATHS = {
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></>,
  plus:   <path d="M12 5v14M5 12h14" />,
  check:  <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close:  <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m6 15 6-6 6 6" />,
};

export default function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="square" aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  );
}
