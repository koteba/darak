# دارك — منصة عقارات عربية

واجهة أمامية فقط (React 18 + Vite + TypeScript + Tailwind + React Router + lucide-react). البيانات التجريبية والمفضلة والإعلانات وطلبات المعاينة والوضع الليلي تُحفظ في localStorage.

## التشغيل
```
npm install
npm run dev
npm run build
```

## النشر على Vercel
1. ارفع المشروع إلى GitHub.
2. استورده في Vercel (يكتشف Vite تلقائياً).
3. Build Command: `npm run build` — Output Directory: `dist`.
4. أو: `npm i -g vercel` ثم `vercel` ثم `vercel --prod`.

ملف `vercel.json` يعيد توجيه كل المسارات إلى `index.html` لدعم React Router.
