// main.js
import { inView, animate, stagger } from "motion";
import { vote, getRates, resetCandidates } from "./candidates.js";
// ここに入っているのは関数名＝関数の定義、ということは関数の実行が必要
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

const resetButton = document.querySelector("#resetBtn");
resetButton.addEventListener("click", function () {
  //confirmをキャンセルしたら、returnするとその下のプログラムは走りません。
  if (!confirm("票数をリセットしますか？")) return;
  //関数の実行
  resetCandidates();
  //関数の実行
  animateBars(); // ← リセット後にバーも初期状態へ戻す
});

// ⬇ 末尾に追加：起動時に、読み込んだ得票率でバーを描画する
animateBars();
