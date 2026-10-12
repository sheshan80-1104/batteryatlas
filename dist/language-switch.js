(()=>{document.querySelectorAll('.language-switch a').forEach(a=>{a.addEventListener('click',()=>{const url=new URL(a.href);url.hash=location.hash;a.href=url.href;});});})();
