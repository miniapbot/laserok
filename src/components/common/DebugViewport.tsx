import { useEffect, useState } from "react";

export default function DebugViewport() {
  const [data, setData] = useState<Record<string, string | number>>({});

  useEffect(() => {
    const update = () => {
      setData({
        viewportWidth: window.WebApp?.viewportWidth ?? "—",
        viewportHeight: window.WebApp?.viewportHeight ?? "—",
        viewportStableHeight: window.WebApp?.viewportStableHeight ?? "—",
        innerWidth: window.innerWidth,
        docClientWidth: document.documentElement.clientWidth,
        bodyWidth: Math.round(document.body.getBoundingClientRect().width),
        platform: window.WebApp?.platform ?? "—",
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#000",
        color: "#0f0",
        fontFamily: "monospace",
        fontSize: "10px",
        padding: "6px",
        zIndex: 9999,
        lineHeight: "1.3",
      }}
    >
      {Object.entries(data).map(([k, v]) => (
        <div key={k}>
          {k}: <b>{String(v)}</b>
        </div>
      ))}
    </div>
  );
}
