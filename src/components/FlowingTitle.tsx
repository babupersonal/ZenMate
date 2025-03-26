import React from "react";
import { gsap } from "gsap";
import "../style/FlowingTitle.scss";

interface MenuItemProps {
  text: string;
  image: string;
  images: string;
  dropdownItems?: { text: string }[];
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingTitle: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({text, image, images, dropdownItems = [] }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: "expo" };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const MouseEnter = () => {
    if (itemRef.current) {
        gsap.to(itemRef.current, { duration: 0.3, ease: "power2.out" });
        gsap.to(itemRef.current.querySelector(".down-item"), { height: "120px", duration: 0.3, ease: "power2.out" });
        const liImg = itemRef.current.querySelector(".li-img") as HTMLDivElement;
        if (liImg) liImg.style.display = "block";
    }
  };

  const MouseLeave = () => {
    if (itemRef.current) {
        gsap.to(itemRef.current, { marginBottom: "0px", duration: 0.3, ease: "power2.in" });
        gsap.to(itemRef.current.querySelector(".down-item"), { height: "0px", duration: 0.3, ease: "power2.in" });
        const liImg = itemRef.current.querySelector(".li-img") as HTMLDivElement;
        if (liImg) liImg.style.display = "none";
    }
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span>{text}</span>
        <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div
      className="menu__item"
      ref={itemRef}
      onMouseEnter={(ev) => { handleMouseEnter(ev); MouseEnter(); }}
      onMouseLeave={(ev) => { handleMouseLeave(ev); MouseLeave(); }}
    >
      <a className="menu__item-link">{text}</a>
      {dropdownItems.length > 0 && (
        <div className="down-item overflow-hidden">
          <div className="li-img">
            <img src={images} />
          </div>
          <ul>
            {dropdownItems.map((item, idx) => (
              <li key={idx} className="group">{item.text}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingTitle;
