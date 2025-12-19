// // 1. استخراج البيانات من الرابط (URL)
// const params = new URLSearchParams(window.location.search);
// const imgParam = params.get('img');
// const typeParam = params.get('type') || '4K Wallpaper';

// // 2. تحديث العناصر ديناميكياً
// if (imgParam) {
//     console.log(imgParam);

//     document.getElementById('dynamic-img').src = imgParam;
// }
// document.getElementById('dynamic-title').innerText = `Your ${typeParam.replace(/_/g, ' ')} is Ready`;



// function downloadImage(url, filename) {
//     // إنشاء عنصر رابط وهمي (Invisible Link)
//     const anchor = document.createElement('a');
//     anchor.href = url;
//     anchor.download = filename || '4K_Wallpaper.jpg'; // خاصية تجبر المتصفح على التحميل
    
//     // إضافته للصفحة، الضغط عليه، ثم حذفه
//     document.body.appendChild(anchor);
//     anchor.click();
//     document.body.removeChild(anchor);
// }


// 3. نظام المحاكاة
let steps = ["Scanning for viruses...", "Optimizing resolution...", "Finalizing link..."];
let currentStep = 0;

const stepInterval = setInterval(() => {
    if (currentStep < steps.length) {
        document.getElementById('status-text').innerText = steps[currentStep];
        currentStep++;
    } else {
        clearInterval(stepInterval);
        document.getElementById('loading-zone').classList.add('hidden');
        document.getElementById('download-btn').classList.remove('hidden');
    }
}, 500);

function goToSponsor() {
    console.log("Opening Offers...");
    
    // التأكد من أن سكريبت CPAGrip قد تم تحميله في الصفحة
    if (typeof call_locker === "function") {
        call_locker(); 
    } 
}

// 1. جلب رابط الصورة من الـ URL
const params = new URLSearchParams(window.location.search);
const imgURL = params.get('img');

// 2. تحديث صورة المعاينة في الصفحة
if (imgURL) {
    document.getElementById('dynamic-img').src = imgURL;
}

// 3. وظيفة الزر (يجب أن يكون الزر في HTML به onclick="startUnlock()")
function startUnlock() {
    if (typeof call_locker === "function") {
        call_locker(); 
    } else {
        alert("Locker is still loading... please wait.");
    }
}

// 4. الدالة التي سينفذها CPAGrip أوتوماتيكياً (Execute JavaScript)
async function triggerRealDownload() {
    // 1. إظهار رسالة نجاح فورية (لتهدئة الزائر)

    try {
        // محاولة جلب الصورة عبر fetch (ستنجح إذا كان السيرفر الخارجي يسمح بـ CORS)
        const response = await fetch(imgURL);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Wallpaper_Premium.jpg';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
    } catch (error) {
        // إذا رفض المتصفح التحميل التلقائي (وهذا وارد جداً في الروابط الخارجية)
        // نقوم بالخيار الاحترافي البديل:
        window.location.href = "success.html?img=" + encodeURIComponent(imgURL);
    }
}











let progress = 0;
let progressInterval;

function startVerification() {
    document.getElementById('download-btn').style.display = 'none';
    document.getElementById('progress-wrapper').style.display = 'block';

    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');

    progressInterval = setInterval(() => {
        // إذا وصل لـ 95%، يتوقف عن الزيادة التلقائية وينتظر
        if (progress >= 80) {
            clearInterval(progressInterval);
            // text.style.display='block'
            
            // استدعاء القفل الآن
            if (typeof call_locker === "function") {
                call_locker();
            }
        } else {
            progress += Math.random() * 3;
            fill.style.width = progress + "%";
            if (progress > 33)   text.style.display='block'

        }
    }, 150);
}

function downloadAfterCPA() {
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');

    // 1. إكمال الشريط لـ 100% فوراً
    progress = 100;
    fill.style.width = "100%";
    text.innerText = "Verification Success! Downloading...";

    // 2. تنفيذ عملية التحميل الحقيقية التي برمجناها سابقاً
    setTimeout(() => {
        triggerRealDownload(); // الدالة التي تحتوي على منطق تحميل الصورة
    }, 1000);
}