(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))u(c);new MutationObserver(c=>{for(const s of c)if(s.type==="childList")for(const h of s.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&u(h)}).observe(document,{childList:!0,subtree:!0});function i(c){const s={};return c.integrity&&(s.integrity=c.integrity),c.referrerPolicy&&(s.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?s.credentials="include":c.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(c){if(c.ep)return;c.ep=!0;const s=i(c);fetch(c.href,s)}})();document.querySelector("#app").innerHTML=`
  <div class="container">
    <h1>🔐 تولید رمز عبور آنلاین</h1>

    <label for="security-level">سطح امنیت:</label>
    <select id="security-level">
      <option value="medium">متوسط</option>
      <option value="strong">قوی</option>
      <option value="advanced">پیشرفته</option>
    </select>

    <label for="length">طول رمز (1 تا 99):</label>
    <input type="number" id="length" min="1" max="99" value="12"/>

    <fieldset>
      <legend>کاراکترهای قابل استفاده:</legend>
      <label><input type="checkbox" class="ios8-switch" id="lowercase" checked /> حروف کوچک (a-z)</label>
      <label><input type="checkbox" class="ios8-switch" id="uppercase" checked /> حروف بزرگ (A-Z)</label>
      <label><input type="checkbox" class="ios8-switch" id="numbers" checked /> اعداد (0-9)</label>
      <label><input type="checkbox" class="ios8-switch" id="symbols" /> نمادها (!@#$%^&*)</label>
      <label><input type="checkbox" class="ios8-switch" id="ambiguous" /> کاراکترهای مبهم ({}[]()/')</label>
    </fieldset>

    <div id="password-display" class="password-display hidden">
      <span id="password-text"></span>
      <button id="copy-btn">کپی</button>
    </div>

    <button id="generate">تولید رمز</button>
    <div class="warning hidden" id="warning">⚠️ لطفاً حداقل یک گزینه را انتخاب کنید.</div>

      <div class="info">طراحی و توسعه توسط <a href="https://mahdisafavi.com/" target="_blank">مهدی صفوی</a></div>
  </div>
`;const b=document.getElementById("generate"),g=document.getElementById("password-text"),m=document.getElementById("password-display"),v=document.getElementById("copy-btn"),p=document.getElementById("warning"),r=document.getElementById("security-level"),n=document.getElementById("lowercase"),d=document.getElementById("uppercase"),o=document.getElementById("numbers"),l=document.getElementById("symbols"),a=document.getElementById("ambiguous");function f(e){e==="medium"?(n.checked=!0,d.checked=!1,o.checked=!0,l.checked=!1,a.checked=!1):e==="strong"?(n.checked=!0,d.checked=!0,o.checked=!0,l.checked=!1,a.checked=!1):e==="advanced"&&(n.checked=!0,d.checked=!0,o.checked=!0,l.checked=!0,a.checked=!0),k()}function y(){const e=n.checked&&!d.checked&&o.checked&&!l.checked&&!a.checked,t=n.checked&&d.checked&&o.checked&&!l.checked&&!a.checked,i=n.checked&&d.checked&&o.checked&&l.checked&&a.checked;e?r.value="medium":t?r.value="strong":i?r.value="advanced":r.value="custom",k()}function w(){return(n.checked?"abcdefghijklmnopqrstuvwxyz":"")+(d.checked?"ABCDEFGHIJKLMNOPQRSTUVWXYZ":"")+(o.checked?"0123456789":"")+(l.checked?"!@#$%^&*":"")+(a.checked?"{}[]()/\\'\"~,;:.<>`":"")}function B(e,t){let i="";for(let u=0;u<e;u++){const c=Math.floor(Math.random()*t.length);i+=t[c]}return i}b.addEventListener("click",()=>{const e=parseInt(document.getElementById("length").value,10),t=w();if(!t||isNaN(e)||e<1||e>99){p.classList.remove("hidden"),m.classList.add("hidden");return}p.classList.add("hidden");const i=B(e,t);g.textContent=i,m.classList.remove("hidden")});v.addEventListener("click",()=>{const e=g.textContent;e&&navigator.clipboard.writeText(e).then(()=>{alert("✅ رمز عبور در کلیپ برد کپی شد!")})});r.addEventListener("change",e=>{const t=e.target.value;t!=="custom"&&f(t)});function k(){const e={securityLevel:r.value,length:parseInt(document.getElementById("length").value,10),lowercase:n.checked,uppercase:d.checked,numbers:o.checked,symbols:l.checked,ambiguous:a.checked};localStorage.setItem("passwordSettings",JSON.stringify(e))}document.querySelectorAll("input[type='checkbox']").forEach(e=>e.addEventListener("change",y));window.addEventListener("load",()=>{const e=localStorage.getItem("passwordSettings");if(e){const t=JSON.parse(e);r.value=t.securityLevel||"strong",document.getElementById("length").value=t.length||12,n.checked=t.lowercase,d.checked=t.uppercase,o.checked=t.numbers,l.checked=t.symbols,a.checked=t.ambiguous,y()}else r.value="strong",f("strong"),document.getElementById("length").value=12;m.classList.add("hidden")});
