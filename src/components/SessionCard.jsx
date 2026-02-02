import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const SessionCard = ({ session }) => {
  const title = session?.title || 'Untitled Session';
  const instructorLine = useMemo(() => {
    const primary = session?.instructor || session?.host || '';
    const secondary = session?.coInstructor || session?.guest || '';
    if (primary && secondary) return `${primary} & ${secondary}`;
    return primary || secondary || '';
  }, [session]);

  const tags = Array.isArray(session?.tags) ? session.tags : [];
  const lives = session?.livesTransformed ?? session?.lives ?? null;
  const isLive = Boolean(session?.isLive || session?.live || session?.liveSession);
  const recordingAvailable = Boolean(session?.recordingAvailable || session?.recording);

  const dateLabel = session?.dateLabel || session?.date || '';
  const timeLabel = session?.time || '';
  const durationLabel = session?.durationLabel || (typeof session?.duration === 'number' ? `${session.duration} Minutes` : session?.duration || '');

  const price = typeof session?.price === 'number' ? session.price : session?.price ? Number(session.price) : null;
  const priceLabel = price && !Number.isNaN(price) ? `₹${price.toLocaleString('en-IN')}` : 'Free';
  const priceSuffix = session?.priceSuffix || 'per session';

  const excerpt = session?.description || 'Join this transformative session and unlock your potential with guided wellness practices.';

  return (
    <div className="h-full w-full">
      <Link 
        to={`/sessions/${session._id}`}
        className="w-full h-full group block"
        aria-label={`View session: ${title}`}
      >
        <div className="bg-gradient-to-t from-[#E9D5FF]/70 via-[#F7EEF5] to-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full h-full min-h-[360px] flex flex-col border border-purple-100 overflow-hidden">
          <div className="relative h-56 sm:h-64 w-full">
            <img
              src={session?.thumbnail || session?.image || session?.imageUrl || '/placeholder-session.jpg'}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute left-4 bottom-4 text-white">
              <div className="text-2xl font-extrabold drop-shadow-sm line-clamp-2">{title}</div>
              {instructorLine && (
                <div className="text-white/90 text-sm font-medium mt-1 line-clamp-1">
                  {instructorLine}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-600 line-clamp-3">
              {excerpt}
            </p>
            <div className="mt-auto pt-4">
              <div className="grid grid-cols-2 gap-4 items-start">
                <div>
                  {dateLabel ? (
                    <div className="text-xl font-extrabold text-gray-900">{dateLabel}</div>
                  ) : (
                    <div className="text-xl font-extrabold text-gray-900">&nbsp;</div>
                  )}
                  <div className="text-base text-gray-700">
                    {[timeLabel, durationLabel].filter(Boolean).join(', ')}
                  </div>
                </div>

                <div className="border-l border-black/10 pl-4">
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-extrabold text-gray-900">{priceLabel}</div>
                    <div className="text-xs text-gray-600">{priceSuffix}</div>
                  </div>
                  {recordingAvailable ? (
                    <div className="text-base text-gray-700 mt-1">Recording Available</div>
                  ) : null}
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center justify-center w-full rounded-full border-2 border-purple-400 text-purple-700 font-semibold text-sm py-2 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                  Book Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SessionCard;
