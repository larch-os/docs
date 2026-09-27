function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className="size-full max-h-[min(60vh,420px)] max-w-[min(60vh,420px)] text-fd-foreground/15"
    >
      <rect
        x="20"
        y="20"
        width="360"
        height="360"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line x1="20" y1="130" x2="380" y2="130" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="270" x2="380" y2="270" stroke="currentColor" strokeWidth="1" />
      <line x1="130" y1="20" x2="130" y2="380" stroke="currentColor" strokeWidth="1" />
      <line x1="270" y1="20" x2="270" y2="380" stroke="currentColor" strokeWidth="1" />
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M10 20h20M20 10v20" />
        <path d="M370 380h20M380 370v20" />
      </g>
      {children}
    </svg>
  );
}

export function TerminalGraphic() {
  return (
    <Frame>
      <g className="text-blue-400" stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="90" y="120" width="220" height="160" rx="4" />
        <line x1="90" y1="150" x2="310" y2="150" strokeWidth="1.5" />
        <circle cx="108" cy="135" r="4" fill="currentColor" stroke="none" />
        <circle cx="124" cy="135" r="4" fill="currentColor" stroke="none" />
        <circle cx="140" cy="135" r="4" fill="currentColor" stroke="none" />
        <path d="M112 180l30 25-30 25" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="155" y1="230" x2="220" y2="230" strokeLinecap="round" />
      </g>
      <text
        x="200"
        y="310"
        textAnchor="middle"
        className="fill-fd-foreground/30 font-[family-name:var(--font-technical)]"
        fontSize="10"
        letterSpacing="2"
      >
        NO WALLED GARDEN
      </text>
    </Frame>
  );
}

export function ToolingGraphic() {
  const boxes = [
    { x: 130, y: 210, label: 'docker' },
    { x: 200, y: 170, label: 'incus' },
    { x: 270, y: 210, label: 'k3d' },
  ];
  return (
    <Frame>
      <g className="text-blue-400" stroke="currentColor" strokeWidth="2" fill="none">
        {boxes.map((b) => (
          <rect key={b.label} x={b.x - 35} y={b.y} width="70" height="50" rx="3" />
        ))}
        <line x1="165" y1="235" x2="200" y2="220" />
        <line x1="235" y1="220" x2="270" y2="235" />
        <line x1="200" y1="170" x2="200" y2="130" strokeDasharray="4 4" />
        <circle cx="200" cy="120" r="10" />
      </g>
      <text
        x="200"
        y="310"
        textAnchor="middle"
        className="fill-fd-foreground/30 font-[family-name:var(--font-technical)]"
        fontSize="10"
        letterSpacing="2"
      >
        BATTERIES INCLUDED
      </text>
    </Frame>
  );
}

export function DefaultsGraphic() {
  return (
    <Frame>
      <g className="text-blue-400" stroke="currentColor" strokeWidth="2" fill="none">
        <line x1="120" y1="150" x2="280" y2="150" />
        <circle cx="230" cy="150" r="10" fill="currentColor" stroke="none" />
        <line x1="120" y1="200" x2="280" y2="200" />
        <circle cx="160" cy="200" r="10" fill="currentColor" stroke="none" />
        <line x1="120" y1="250" x2="280" y2="250" />
        <circle cx="195" cy="250" r="10" fill="currentColor" stroke="none" />
      </g>
      <text
        x="200"
        y="310"
        textAnchor="middle"
        className="fill-fd-foreground/30 font-[family-name:var(--font-technical)]"
        fontSize="10"
        letterSpacing="2"
      >
        TUNED, NOT GUESSED
      </text>
    </Frame>
  );
}

export function SpeedGraphic() {
  return (
    <Frame>
      <g className="text-blue-400" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none">
        <path d="M215 100l-75 110h55l-25 90 90-120h-55z" />
      </g>
      <text
        x="200"
        y="310"
        textAnchor="middle"
        className="fill-fd-foreground/30 font-[family-name:var(--font-technical)]"
        fontSize="10"
        letterSpacing="2"
      >
        BOOT. WORK. DONE.
      </text>
    </Frame>
  );
}
