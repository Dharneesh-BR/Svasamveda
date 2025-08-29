import { t } from '../../i18n';

export default function SelfSessionsSoul() {
  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">{t('soul.selfSessions.title')}</h1>
      <p className="text-gray-700">{t('soul.selfSessions.description')}</p>
    </div>
  );
}
