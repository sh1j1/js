javascript:(function(){
  const keyword = prompt("请输入要搜索的关键字：");
  if (!keyword) return;

  const maxDepth = parseInt(prompt("请输入最大子目录层数（0表示仅当前目录）：" , "2"), 10);
  const results = [];

  function searchInElement(el, depth) {
    if (depth > maxDepth) return;
    const items = el.querySelectorAll(":scope > li");
    items.forEach(li => {
      const text = li.textContent.trim();
      if (text.includes(keyword)) results.push(text);
      const nestedUL = li.querySelector("ul");
      if (nestedUL) searchInElement(nestedUL, depth + 1);
    });
  }

  // 假设网页结构中目录是以 ul > li 嵌套的（适用于GitHub风格）
  const root = document.querySelector("ul");
  if (!root) {
    alert("未找到目录结构（ul > li）");
    return;
  }

  searchInElement(root, 0);

  if (results.length === 0) {
    alert("没有找到匹配的条目。");
  } else {
    alert("找到如下匹配项：\n" + results.join("\n"));
  }
})();
