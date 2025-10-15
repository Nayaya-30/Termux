export const addKeyShortcuts = (handlers: {
  minimizeAll?: () => void;
  openCommand?: () => void;
}) => {
  if (typeof window === 'undefined') return;
  window.addEventListener('keydown', (e) => {
    if (e.key === 'm' && (e.metaKey || e.ctrlKey)) {
      handlers.minimizeAll?.();
    }
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      handlers.openCommand?.();
    }
  });
};