import "./style.css";
import { animate } from "motion";
// 3つのAPIを取得
import { getPokemon, getSpecies, loadJpDict } from "./api.js";
import { renderPokemon, showError, setLoading } from "./view.js";

animate(
  document.querySelector(".spinner"),
  { rotate: [0, 360] },
  { duration: 1, repeat: Infinity, ease: "linear" },
);

let controller;

const load = async (input) => {
  if (controller) controller.abort();
  controller = new AbortController();
  setLoading(true);

  try {
    const dict = await loadJpDict();
    // null 合体演算子（左辺が null か undefined のときだけ、右辺を返します）
    const query = dict[input] ?? input.toLowerCase();

    // 2. ★ 2つのAPIを並行取得
    const [pokemon, species] = await Promise.all([
      getPokemon(query, controller.signal),
      getSpecies(query, controller.signal),
    ]);

    // 3. species から日本語名を取り出して renderPokemon に渡す
    const jpName = species.names.find((n) => n.language.name === "ja")?.name;
    renderPokemon(pokemon, jpName);
  } catch (err) {
    if (err.name === "AbortError") return;
    console.error(err);
    showError("見つかりませんでした");
  } finally {
    setLoading(false);
  }
};

document.querySelector("#searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // .toLowerCase()を外して日本語を受け付けるようにする。
  load(document.querySelector("#keyword").value.trim());
});
