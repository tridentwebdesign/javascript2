// main.js
import { inView, animate, stagger } from "motion";
import { vote, getRates } from "./candidates.js";

// スクロールで対象のオブジェクトが表示されたら

inView(".card", () => {
  animate(
    ".card",
    { opacity: [0, 1], y: [40, 0] },
    { duration: 0.5, delay: stagger(1) },
  );
});

// 全カードのバーを得票率に合わせてアニメーションさせる
const animateBars = () => {
  getRates().forEach(({ id, rate }) => {
    const bar = document.querySelector(`[data-id="${id}"] .bar`);
    animate(bar, { width: `${rate}%` }, { duration: 0.4, easing: "ease-out" });
  });
};

document.querySelectorAll(".card").forEach((card) => {
  const id = Number(card.dataset.id);
  const btn = card.querySelector(".vote-btn");

  btn.addEventListener("click", () => {
    vote(id);
    animate(btn, { scale: [1, 1.3, 1] }, { duration: 0.3 });
    animateBars();
  });
});
