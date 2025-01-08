class TrieNode {
  constructor(char) {
    this.children = {};
    this.value = char;
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode("");
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!node.children[char]) {
        node.children[char] = new TrieNode(char);
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      let char = word[i];

      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      let char = prefix[i];
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}

let rootEl = document.documentElement;
let hotspot = document.getElementById("hotspot");
let input = document.getElementById("input");
let debug = document.getElementById("debug");
let text = new Trie();
let oldString = "";

input.addEventListener("keyup", (e) => {
  text.insert(e.target.value ?? "");
  if (e.target.value.length < oldString.length) {
    // adding character
    updateScreen(hotspot.children[1], text.root);
  } else if (e.target.value.length > oldString.length) {
    // adding cheracter, should add to rood node.
    updateScreen(hotspot.children[1], text.root);
  }
  console.log(text);

  // debug.textContent = JSON.stringify(text, null, 2);
  oldString = e.target.value;
});

function updateScreen(el, node, depth = 0) {
  console.log("'" + node.value + "'");
  el.textContent = node.value.replace(" ", "\u00A0");
  let route = Object.keys(node.children).length - 1;
  for (let [key, child] of Object.entries(node.children)) {
    let newEl = document.createElement("span");
    newEl.classList.add("curl");
    newEl.style.setProperty(
      "transform",
      `rotate(${-20 * route}deg) ${route ? "translateY(-2ch)" : ""}`
    );
    // newEl.style.setProperty("left", `${depth}ch`);
    updateScreen(newEl, child, depth + 1);

    el.appendChild(newEl);
    route--;
  }
}
