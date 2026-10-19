const workGalleries = {
    "خلفيات TV": { prefix: "tv" },
    "ديكورات الجدران": { prefix: "walls" },
    "ديكورات المداخل": { prefix: "entrances" },
    "خلفيات السرير": { prefix: "bed" },
    "بديل الشيبورد": { prefix: "chipboard" },
    "بديل شيبورد": { prefix: "chipboard" },
    "بديل الرخام": { prefix: "marble" }
};

function openWork(name) {
    const normalizedName = String(name || "").trim();
    const key = Object.keys(workGalleries).find(item =>
        item === normalizedName || item.includes(normalizedName) || normalizedName.includes(item)
    );

    if (!key) {
        alert("لم يتم العثور على معرض هذا القسم: " + normalizedName);
        return;
    }

    const section = workGalleries[key];
    const popup = document.getElementById("popup");

    if (!popup) {
        alert("تعذر فتح المعرض. أعد تحميل الصفحة.");
        return;
    }

    let gallery = `
        <div style="background:#171717;color:white;padding:18px;border-radius:14px;max-height:85vh;overflow:auto;">
            <button onclick="closeWork()" style="float:left;background:#d8b45a;color:#111;border:0;padding:9px 14px;border-radius:8px;cursor:pointer;">إغلاق ✕</button>
            <h2 style="color:#d8b45a;margin:22px 0;">أعمال ${key}</h2>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;">
    `;

    for (let i = 2; i <= 7; i++) {
        const src = `./${section.prefix}${i}.jpg`;
        gallery += `
            <img src="${src}" alt="أعمال ${key} - ${i - 1}"
            onclick="showLargeImage('${src}', '${key}')"
            style="width:100%;height:180px;object-fit:cover;border-radius:10px;cursor:zoom-in;background:#292929;"
            onerror="this.style.display='none';">
        `;
    }

    gallery += `</div></div>`;
    popup.innerHTML = gallery;
    popup.classList.add("active");
}

function showLargeImage(src, key) {
    const popup = document.getElementById("popup");
    if (!popup) return;

    popup.innerHTML = `
        <div onclick="openWork('${key}')"
        style="position:fixed;inset:0;background:rgba(0,0,0,.95);
        display:flex;align-items:center;justify-content:center;
        padding:12px;z-index:9999;">

            <button
            onclick="event.stopPropagation();openWork('${key}')"
            style="position:absolute;top:20px;right:20px;
            background:#d8b45a;color:#111;border:0;
            padding:10px 14px;border-radius:8px;cursor:pointer;">
            العودة للمعرض ↩
            </button>

            <button
            onclick="event.stopPropagation();closeWork()"
            style="position:absolute;top:20px;left:20px;
            background:#333;color:white;border:0;
            padding:10px 14px;border-radius:8px;cursor:pointer;">
            إغلاق ✕
            </button>

            <img src="${src}" alt="صورة مكبرة"
            onclick="event.stopPropagation()"
            style="max-width:100%;max-height:80vh;object-fit:contain;">
        </div>
    `;

    popup.classList.add("active");
}

function closeWork() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.classList.remove("active");
        popup.innerHTML = "";
    }
}
