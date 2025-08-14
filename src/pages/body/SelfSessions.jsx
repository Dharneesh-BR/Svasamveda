import { t } from '../../i18n';

export default function SelfSessionsBody() {
  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-2xl font-bold text-green-800 mb-4">{t('body.selfSessions.title')}</h1>
      <p className="text-gray-700">{t('body.selfSessions.description')}</p>
    </div>
  );
}
