// candidates.js
// Local Storage用のキー
const STORAGE_KEY = "vote-2026";

// 自分のテーマに合わせて書き直してください。
// 初期値に変更しました。
const initialCandidates = [
  { id: 1, votes: 0 },
  { id: 2, votes: 0 },
  { id: 3, votes: 0 },
];

// ⬇ 追加：起動時にLocalStorageから読み込む（無ければ初期値）
// アロー関数、関数の定義
const loadCandidates = () => {
  //LocalStorageから"vote-2026"をキーに持つ値を取得
  const saved = localStorage.getItem(STORAGE_KEY);
  //三項（条件）演算子
  return saved ? JSON.parse(saved) : initialCandidates;
};

// ⬇ 追加：投票後にLocalStorageに保存する
// 関数の定義（引数付き）
const saveCandidates = (candidates) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

// ⬇書き換え：const → let（map()で作り直すため）+ 初期値を loadCandidates から
// 変数（let）の宣言 ⇐ 関数の実行した結果（return戻り値）
let candidates = loadCandidates();

// 票数テキストを更新する関数の定義
const updateVoteText = () => {
  candidates.forEach((item) => {
    const card = document.querySelector(`[data-id="${item.id}"]`);
    card.querySelector(".votes").textContent = `${item.votes}票`;
  });
};

// 各候補の得票率を返す関数
export const getRates = () => {
  const total = candidates.reduce((sum, item) => sum + item.votes, 0);
  return candidates.map((item) => ({
    id: item.id,
    rate: total > 0 ? Math.round((item.votes / total) * 100) : 0,
  }));
};

// 投票処理の関数の定義
export const vote = (id) => {
  //変数の更新　配列.map((引数)　=>{})
  //前についた配列の要素分ループ（今回は3回）cは、
  candidates = candidates.map((c) =>
    //cには、各回の要素（オブジェクト）
    //三項（条件）演算子
    //...c = スプレッド構文は、id: 1, votes: 0 に展開
    c.id === id ? { ...c, votes: c.votes + 1 } : c,
  );
  //関数の実行（引数付き）※candidatesは上書きされている
  saveCandidates(candidates);
  //関数の実行
  updateVoteText();
};

// ⬇ 末尾に追加：リセット用にexport
export const resetCandidates = () => {
  localStorage.removeItem(STORAGE_KEY);
  //スプレッド構文（初期値）で展開
  candidates = initialCandidates.map((c) => ({ ...c }));
  updateVoteText();
};

//最新の情報を描写（レンダリング）する関数の実行
updateVoteText();
