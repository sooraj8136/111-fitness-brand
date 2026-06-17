const items = [
  "Good place to keep fitness",
  "★★★★★",
  "Pretty good. Good equipments. Nice ambience.",
  "★★★★★",
  "Good experience 👍",
  "★★★★★",
  "4.7 Stars · 59 Google Reviews",
];

export function ReviewMarquee() {
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <span key={i}>
            {t}
            <span className="dot" style={{ marginLeft: "3rem" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}