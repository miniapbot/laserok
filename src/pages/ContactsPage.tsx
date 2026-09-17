import { useNavigate } from "react-router-dom";
import { haptic, openLink } from "@/services/platformApi";

const SHOP = {
  phone: "+7 (921) 971-72-63",
  phoneRaw: "+79219717263",
  email: "andputnik@yandex.ru",
  max: "https://max.ru/u/f9LHodD0cOLJHT_2YjeeAkvxnAE01lKx9zb9DoHziMTOMZSC_ijWrbw2vv8",
  telegram: "https://t.me/anlazerok",
  whatsapp: "https://wa.me/79219717263",
  hours: [
    { day: "Понедельник – Пятница", time: "08:00 – 18:00" },
    { day: "Суббота", time: "выходной", closed: true },
    { day: "Воскресенье", time: "выходной", closed: true },
  ],
  legal: {
    name: " Жетонов А.В.",
    inn: "344800657890",
  },
};

export default function ContactsPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-4 text-slate-500 hover:text-slate-900 text-sm"
      >
        ← В каталог
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-4">Контакты</h1>

      <div className="space-y-3">
        <a
          href={`tel:${SHOP.phoneRaw}`}
          onClick={() => haptic.light()}
          className="block bg-white rounded-2xl shadow-sm p-4 pl-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">📞</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-slate-500 mb-0.5">Телефон</div>
              <div className="text-slate-900 font-medium truncate">{SHOP.phone}</div>
            </div>
          </div>
        </a>

        <a
          href={`mailto:${SHOP.email}`}
          onClick={() => haptic.light()}
          className="block bg-white rounded-2xl shadow-sm p-4 pl-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">✉️</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-slate-500 mb-0.5">Email</div>
              <div className="text-slate-900 font-medium truncate">{SHOP.email}</div>
            </div>
          </div>
        </a>

        <div className="bg-white rounded-2xl shadow-sm p-4 pl-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">💬</div>
            <div className="text-slate-900 font-medium">Мессенджеры</div>
          </div>
          <div className="flex flex-col gap-2">
            <button type="button" onClick={() => openLink(SHOP.max)} className="text-left px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm">MAX →</button>
            <button type="button" onClick={() => openLink(SHOP.telegram)} className="text-left px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm">Telegram →</button>
            <button type="button" onClick={() => openLink(SHOP.whatsapp)} className="text-left px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm">WhatsApp →</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 pl-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">🕐</div>
            <div className="text-slate-900 font-medium">Часы работы</div>
          </div>
          <div className="space-y-2">
            {SHOP.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-3 text-sm">
                <span className="text-slate-500">{h.day}</span>
                <span className={h.closed ? "text-slate-400" : "text-slate-900 font-medium"}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 pl-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">🏢</div>
            <div className="text-slate-900 font-medium">Реквизиты</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Наименование</span>
              <span className="text-slate-900 text-right">{SHOP.legal.name}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">ИНН</span>
              <span className="text-slate-900 font-mono">{SHOP.legal.inn}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openLink(SHOP.max)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-2xl transition-colors"
        >
          Написать в MAX
        </button>
      </div>
    </div>
  );
}
