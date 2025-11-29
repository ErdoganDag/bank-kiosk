🏦 Bank Kiosk UI

Modern bankacılık işlemleri için geliştirilmiş, dokunmatik ekran uyumlu, hızlı ve kullanıcı dostu bir kiosk arayüzüdür.
Bu uygulama ile kullanıcılar kimlik / telefon doğrulama, kategori seçimi, bilet oluşturma gibi adımları kolayca gerçekleştirebilir.

🚀 Özellikler
🔢 NumPad Giriş Ekranı

Dokunmatik ekranlar için optimize edilmiş büyük butonlar

T.C. kimlik, telefon ve vergi numarası otomatik algılama

Şık, gradient arka plan

Hata mesajı yapısı

“Giriş”, “Sil” ve ortalanmış 0 tuşu

🗂️ Tür Seçim Ekranı

Grid yapısı

Hover & seçili kart efektleri

Icon destekli kategori kartları

Modern mavi tonlu arayüz

Responsive tasarım

🎟️ Bilet Oluşturma

Backend API ile entegre

JWT veya session yapısı ile entegre olabilir

Frontend → Backend → Frontend ticket flow

🖼 Örnek Ekran Görüntüleri

Şu an proje mockup içermiyor. Aşağıdaki görseller “örnek tasarım görselleri”dir.
Sen gerçek ekranlarını gönderdiğinde buraya gerçek screenshot’larını ekleyebiliriz.

🔢 NumPad Ekranı (Mockup)
 ------------------------------
|         BANK KIOSK           |
|    Kimlik/Telefon Girişi     |
|   [   5 3 1 0 2 8 ...   ]    |
| [1] [2] [3]                  |
| [4] [5] [6]                  |
| [7] [8] [9]                  |
|    [0]                       |
| [Giriş]        [Sil]         |
 ------------------------------

🛠 Teknolojiler
Teknoloji	Açıklama
Angular 17+ (Standalone)	Projenin ana çatısı
TypeScript	Güçlü tip desteği
CSS / Gradient UI	Kiosk’a özel tasarım teması
Router	Çok adımlı navigasyon
LocalStorage	Kullanıcı tipinin saklanması
REST API (ASP.NET Core)	Bilet oluşturma backend’i

📂 Proje Yapısı
bank-kiosk/
│
├── src/app/
│   ├── pages/
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.css
│   │   ├── type-selection/
│   │   │   ├── type-selection.component.ts
│   │   │   ├── type-selection.component.html
│   │   │   └── type-selection.component.css
│   │   └── ticket/
│   │       └── ...
│   ├── app.routes.ts
│   └── main.ts
│
└── assets/
    └── logo.png

⚙️ Kurulum
1️⃣ Bağımlılıkları yükleyin
npm install

2️⃣ Projeyi çalıştırın
ng serve --open

3️⃣ Backend API adresi için

src/assets/config.json oluşturun:

{
  "apiUrl": "http://localhost:5002/api"
}

🔧 Derleme (Kiosk İçin Tavsiye Edilen)
ng build --configuration production


IIS veya Nginx’e yüklemek için dist/bank-kiosk/ klasörünü kullanabilirsiniz.

👨‍💻 Geliştiren

Erdoğan Dağ
2025 Bankacılık Kiosk Arayüzü

📌 Lisans

MIT License
