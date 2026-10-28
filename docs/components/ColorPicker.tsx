export function ColorPicker({
  label,
  presets,
  selected,
  onChange,
  onRandomize,
  isRandomized,
  getLabel = name => name,
  showLabels = false,
}: {
  label: string;
  presets: Record<string, string>;
  selected: string;
  onChange: (name: string) => void;
  onRandomize?: () => void;
  isRandomized?: boolean;
  getLabel?: (name: string) => string;
  showLabels?: boolean;
}) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-wide text-muted-light mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(presets).map(([name, hex]) => {
          const isTransparent = hex === 'transparent';
          const colorLabel = getLabel(name);
          return (
            <button
              key={name}
              className={
                'border-2 cursor-pointer transition-all duration-150' +
                (showLabels ? ' flex items-center gap-2 min-h-9 px-2 py-1.5 rounded-lg text-xs text-muted-light' : ' w-8 h-8 rounded-full') +
                (!isRandomized && name === selected
                  ? ' border-accent shadow-[0_0_8px_rgba(123,104,238,0.4)]' + (showLabels ? '' : ' scale-115')
                  : ' border-border hover:border-hover-border' + (showLabels ? '' : ' hover:scale-110')) +
                (isTransparent && !showLabels ? ' swatch-transparent' : '')
              }
              title={showLabels && colorLabel !== hex ? `${colorLabel} (${hex})` : colorLabel}
              aria-label={showLabels && colorLabel !== hex ? `${colorLabel} (${hex})` : colorLabel}
              style={isTransparent || showLabels ? undefined : { backgroundColor: hex }}
              onClick={() => onChange(name)}
            >
              {showLabels && <>
                <span
                  className={'block w-6 h-6 rounded-full border border-border shrink-0' + (isTransparent ? ' swatch-transparent' : '')}
                  style={isTransparent ? undefined : { backgroundColor: hex }}
                />
                <span>{colorLabel}</span>
              </>}
            </button>
          );
        })}
        {onRandomize && (
          <button
            className={
              'w-8 h-8 rounded-full border-2 border-dashed cursor-pointer flex items-center justify-center transition-all duration-150' +
              (isRandomized
                ? ' border-accent bg-selected-bg text-accent scale-115'
                : ' bg-card border-border hover:border-accent hover:text-accent hover:scale-110 text-muted')
            }
            title="Randomize"
            onClick={onRandomize}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="16" cy="8" r="1.5" />
              <circle cx="8" cy="16" r="1.5" />
              <circle cx="16" cy="16" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
